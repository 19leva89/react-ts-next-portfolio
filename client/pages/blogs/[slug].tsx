import axios from 'axios'
import Form from 'next/form'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { Types } from 'mongoose'
import { useParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'

import { IBlog } from '@/models/blog'
import { IComment } from '@/models/comment'
import { formatDate } from '@/utils/format-date'
import { useFetchData } from '@/hooks/use-fetch-data'
import { BlogSearch, CodeBlock, Spinner } from '@/components'

import { BsCopy } from 'react-icons/bs'
import { CiRead } from 'react-icons/ci'
import { FiSearch } from 'react-icons/fi'
import { FaTwitter } from 'react-icons/fa'
import { SlCalender } from 'react-icons/sl'
import { BiLogoLinkedin } from 'react-icons/bi'
import { RiFacebookFill, RiWhatsappFill } from 'react-icons/ri'

const BlogPage = () => {
	const { slug } = useParams() as { slug: string }
	const { allData = [] } = useFetchData<IBlog[]>('/api/blogs')

	const [error, setError] = useState<string | null>(null)
	const [copied, setCopied] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)
	const [messageOk, setMessageOk] = useState<string>('')
	const [searchInput, setSearchInput] = useState<boolean>(false)
	const [blogData, setBlogData] = useState<{ blog: IBlog; comments: IComment[] }>({
		blog: {} as IBlog,
		comments: [] as IComment[],
	})
	const [newComment, setNewComment] = useState<IComment>({
		_id: '',
		name: '',
		email: '',
		title: '',
		contentPreview: '',
		mainComment: true,
		blog: new Types.ObjectId(),
		parent: null,
		parentName: '',
	})

	// for scroll down to comment form
	const replyFormRef = useRef<HTMLDivElement>(null)

	const createdAtDate =
		blogData && blogData.blog.createdAt ? new Date(blogData && blogData.blog.createdAt) : null

	const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`

	const copyToClipboard = (url: string) => {
		navigator.clipboard.writeText(url)
		setCopied(true)

		setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const res = await axios.post(`/api/blogs/${slug}`, newComment)

			// check for if it`s a reply (nested comment) or a main comment
			if (newComment.parent) {
				// add the new comment to it`s parent`s children array
				setBlogData((prev) => {
					const updatedComments = (prev.comments ?? []).map((comment) => {
						if (comment._id === newComment.parent?.toString()) {
							return {
								...comment,
								children: [...(comment.children ?? []), res.data],
							}
						} else if (comment.children && comment.children.length > 0) {
							// recursively update the children comments
							return {
								...comment,
								children: updateChildrenComments(
									comment.children,
									newComment.parent?.toString() ?? '',
									res.data,
								),
							}
						}

						return comment
					})

					return {
						...prev,
						comments: updatedComments,
					}
				})

				// add new root comment
			} else {
				setBlogData((prev) => ({
					...prev,
					comments: [res.data, ...prev.comments],
				}))
			}

			setMessageOk('✅ Comment posted successfully!')

			setTimeout(() => {
				setMessageOk('')
			}, 5000)

			setNewComment({
				_id: '',
				name: '',
				email: '',
				title: '',
				contentPreview: '',
				mainComment: true,
				blog: new Types.ObjectId(),
				parent: null,
				parentName: '',
			})
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setMessageOk('❌ Failed to post comment, please try again later.')

				setError(error.response?.data?.message || 'An unexpected error occurred')
			} else {
				setMessageOk('❌ Failed to post comment, please try again later.')

				setError('An unexpected error occurred')
			}

			setTimeout(() => {
				setMessageOk('')
			}, 5000)
		}
	}

	const handleReply = (parentCommentId: Types.ObjectId, parentName: string) => {
		setNewComment({
			...newComment,
			parent: parentCommentId,
			parentName: parentName,
			mainComment: false,
		})

		if (replyFormRef.current) {
			replyFormRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleRemoveReply = () => {
		setNewComment({
			...newComment,
			parent: null,
			parentName: '',
			mainComment: true,
		})
	}

	const updateChildrenComments = (
		comments: IComment[],
		parentId: string,
		newComment: IComment,
	): IComment[] => {
		return comments.map((comment) => {
			if (comment._id === parentId) {
				// add new reply to children array
				return {
					...comment,
					children: [...(comment.children ?? []), newComment],
				}
			} else if (comment.children && comment.children.length > 0) {
				// recursively update the children comments
				return {
					...comment,
					children: updateChildrenComments(comment.children, parentId, newComment),
				}
			}

			return comment
		})
	}

	const renderComments = (comments: IComment[]) => {
		if (!comments) {
			return null
		}

		// create a map to efficiently find children of each comment
		const commentsMap = new Map()
		comments.forEach((comment) => {
			if (comment.mainComment) {
				commentsMap.set(comment._id, [])
			}
		})

		// populate children comments into their respective parents
		comments.forEach((comment) => {
			if (!comment.mainComment && comment.parent) {
				if (commentsMap.has(comment.parent)) {
					commentsMap.get(comment.parent).push(comment)
				}
			}
		})

		// render the comments
		return comments
			.filter((comment) => comment.mainComment)
			.map((parentComment) => (
				<div key={parentComment._id} className="blog-comment">
					<h3>
						{parentComment.name} <span>{parentComment.createdAt?.toLocaleString()}</span>
					</h3>

					<h4>
						Topic: <span>{parentComment.title}</span>
					</h4>

					<p>{parentComment.contentPreview}</p>

					<button onClick={() => handleReply(new Types.ObjectId(parentComment._id), parentComment.name)}>
						Reply
					</button>

					{parentComment.parent && <span className="replied-to">Replied to {parentComment.parentName}</span>}

					<div className="children-comments">
						{commentsMap.get(parentComment._id).map((childComment: IComment) => (
							<div key={childComment._id} className="child-comment">
								<h3>
									{childComment.name} <span>{childComment.createdAt?.toLocaleString()}</span>
								</h3>

								<span>Replied to {childComment.parentName}</span>

								<h4>
									Topic: <span>{childComment.title}</span>
								</h4>

								<p>{childComment.contentPreview}</p>
							</div>
						))}
					</div>
				</div>
			))
	}

	const handleSearchOpen = () => {
		setSearchInput(!searchInput)
	}

	const handleSearchClose = () => {
		setSearchInput(false)
	}

	useEffect(() => {
		const fetchBlogData = async () => {
			if (slug) {
				try {
					const res = await axios.get(`/api/blogs/${slug}`)

					setBlogData(res.data)
					setLoading(false)
				} catch (error) {
					setError('Failed to fetch blog data, please try again later.')
					setLoading(false)
				}
			}
		}

		fetchBlogData()
	}, [slug])

	if (loading) {
		return (
			<div className="flex flex-center wh_100">
				<Spinner />
			</div>
		)
	}

	if (error) {
		return <p>Error: {error}</p>
	}

	return (
		<>
			<Head>
				<title>{slug ? slug.replace(/-/g, ' ') : 'Loading...'}</title>
			</Head>

			{blogData && (
				<div className="blog-slug-page">
					<div className="container">
						<div className="blog-slug-page-cont">
							<div className="left-side-details">
								<div className="left-blog-info-img">
									<Image
										src={
											blogData.blog.images && blogData.blog.images.length > 0
												? blogData.blog.images[0]
												: '/img/no-image.png'
										}
										alt={blogData.blog.title}
										width={910}
										height={350}
										quality={100}
									/>
								</div>

								<div className="slug-blog-info-pub">
									<div className="flex gap-2">
										<div className="admin-slug">
											<Image src="/img/coder-white.png" alt="coder" width={30} height={30} />

											<span>by Sobolev</span>
										</div>

										<div className="admin-slug">
											<SlCalender />
											<span>{formatDate(createdAtDate)}</span>
										</div>

										<div className="admin-slug">
											<CiRead />
											<span>Comments ({blogData.comments ? blogData.comments.length : 0})</span>
										</div>
									</div>

									<div className="share-blog-slug">
										{/* copy url button */}
										<div
											title="Copy URL"
											onClick={() => copyToClipboard(blogUrl)}
											style={{ cursor: 'pointer' }}
										>
											<BsCopy />
											<span>{copied ? 'Copied!' : ''}</span>
										</div>

										{/* facebook share button */}
										<Link
											href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<RiFacebookFill />
										</Link>

										{/* twitter share button */}
										<Link
											href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this blog post: ${blogData.blog.title}`)}&url=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FaTwitter />
										</Link>

										{/* whatsapp share button */}
										<Link
											href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<RiWhatsappFill />
										</Link>

										{/* linkedin share button */}
										<Link
											href={`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`}
											target="_blank"
											rel="noopener noreferrer"
										>
											<BiLogoLinkedin />
										</Link>
									</div>
								</div>

								<h1>{blogData.blog.title}</h1>

								{loading ? (
									<Spinner />
								) : (
									<div className="blog-content">
										<ReactMarkdown
											remarkPlugins={[remarkGfm]}
											components={{
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												code: (props: any) => <CodeBlock {...props} inline={false} />,
											}}
										>
											{blogData.blog.description}
										</ReactMarkdown>
									</div>
								)}

								<div className="blog-slug-tags">
									<div className="blog-s-tags">
										<h2>Tags:</h2>

										<div className="flex flex-wrap gap-1">
											{blogData.blog?.tags?.map((tag) => <span key={tag}>{tag}</span>)}
										</div>
									</div>
								</div>

								<div className="blog-use-comments">
									<h2>Comments:</h2>
									{renderComments(blogData.comments)}
								</div>

								<div className="blog-slug-comments" ref={replyFormRef}>
									{newComment.parentName && (
										<h2 className="flex flex-left gap-05">
											Leave a reply to <span className="parent-name">{newComment.parentName}</span>
											<button onClick={handleRemoveReply} className="remove-reply-btn">
												Remove reply
											</button>
										</h2>
									)}

									{!newComment.parentName && <h2>Leave a reply</h2>}

									<p>Your email will not be published. All fields are required.</p>

									<form onSubmit={handleCommentSubmit} className="leave-areply-form">
										<div className="name-email-comment">
											<input
												type="text"
												placeholder="Enter Name"
												value={newComment.name}
												onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
												required
											/>

											<input
												type="email"
												placeholder="Enter Email"
												value={newComment.email}
												onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
												required
											/>
										</div>

										<input
											type="text"
											placeholder="Enter Title"
											value={newComment.title}
											onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
											required
										/>

										<textarea
											name=""
											rows={4}
											id="text-comments"
											placeholder="Enter your Comment"
											value={newComment.contentPreview}
											onChange={(e) => setNewComment({ ...newComment, contentPreview: e.target.value })}
											required
										></textarea>

										<div className="flex gap-2">
											<button type="submit">Post Comment</button>

											<p>{messageOk}</p>
										</div>
									</form>
								</div>
							</div>

							<div className="right-side-details">
								<Form action="" className="right-slug-search-bar">
									<input type="text" placeholder="Search..." onClick={handleSearchOpen} />

									<button>
										<FiSearch />
									</button>
								</Form>

								<div className="right-slug-category">
									<h2>Categories</h2>

									<ul>
										<Link href={`/blogs/category/node-js`}>
											<li>
												Node JS
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('node-js'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/react-js`}>
											<li>
												React JS
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('react-js'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/next-js`}>
											<li>
												Next JS
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('next-js'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/css`}>
											<li>
												CSS
												<span>
													{
														allData?.filter((item) => item.blogCategory && item.blogCategory.includes('css'))
															.length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/digital-marketing`}>
											<li>
												Digital Marketing
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('digital-marketing'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/flutter-dev`}>
											<li>
												Flutter Dev
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('flutter-dev'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/database`}>
											<li>
												Database
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('database'),
														).length
													}
												</span>
											</li>
										</Link>

										<Link href={`/blogs/category/deployment`}>
											<li>
												Deployment
												<span>
													{
														allData?.filter(
															(item) => item.blogCategory && item.blogCategory.includes('deployment'),
														).length
													}
												</span>
											</li>
										</Link>
									</ul>
								</div>

								<div className="right-recent-post">
									<h2>Recent Posts</h2>
									{allData?.slice(0, 3).map((blog) => (
										<Link key={blog._id} href={`/blogs/${blog.slug}`} className="right-recent-p">
											<Image
												src={blog.images && blog.images.length > 0 ? blog.images[0] : '/img/no-image.png'}
												alt={blog.title}
												width={100}
												height={100}
											/>

											<div>
												<h3>{blog.title}</h3>
												<h4 className="mt-1">
													{blog.tags?.slice(0, 3).map((tag) => {
														return <span key={tag}>{tag}</span>
													})}
												</h4>
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>

					{searchInput ? <BlogSearch cls={handleSearchClose} /> : null}
				</div>
			)}
		</>
	)
}

export default BlogPage
