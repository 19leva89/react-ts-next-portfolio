'use client'

import Link from 'next/link'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { IBlog } from '@/models/blog'
import { useFetchData } from '@/hooks/use-fetch-data'

interface Props {
	cls: () => void
}

const extractFirstParagraph = (markdown: string) => {
	// Split markdown by double newline to separate paragraphs
	const paragraphs = markdown.split('\n\n')

	// Return the first paragraph (assuming paragraphs[0] is the first paragraph)
	return paragraphs[0]
}

export const BlogSearch = ({ cls }: Props) => {
	const { allData = [] } = useFetchData<IBlog[]>('/api/blogs') // Assuming useFetchData returns an object with all work and loading

	const [blogTitle, setBlogTitle] = useState<string>('') // blog title should be initialized as a string
	const [searchResult, setSearchResult] = useState<IBlog[]>([])

	// filter for published blogs required
	const publishedData = allData?.filter((blog) => blog.status === 'publish') || []

	// Function to handle search
	useEffect(() => {
		if (!blogTitle.trim()) {
			// Here, blog title should be checked if it's an empty string
			setSearchResult([])
			return
		}

		const filteredBlogs = publishedData.filter((blog) =>
			blog.title.toLowerCase().includes(blogTitle.toLowerCase()),
		)

		setSearchResult(filteredBlogs) // setSearchResult should be used to update searchResult state
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blogTitle, allData]) // Include all work in dependencies to ensure useEffect updates when data changes

	const handleBlogClick = () => {
		setBlogTitle('') // This clears the input field when a blog is clicked
	}

	return (
		<div className='search-blog-fix'>
			<div className='search-blog-section-fix'>
				<div className='sbsf-input flex items-center gap-4'>
					<input
						type='text'
						placeholder='Search blog here'
						value={blogTitle}
						onChange={(e) => setBlogTitle(e.target.value)}
						className='rounded-xl border border-[#8a81d3]'
					/>

					<div className='sbs-input-close' onClick={cls}>
						<XIcon size={55} />
					</div>
				</div>
				<div className='sbsf-search-list mt-8'>
					{blogTitle && (
						<>
							{searchResult.length === 0 ? (
								<h3>
									No Blog Found <span>(please check your spelling)</span>
								</h3>
							) : (
								<>
									{searchResult.slice(0, 10).map((blog) => {
										return (
											<Link
												key={blog._id.toString()}
												href={`/blogs/${blog.slug}`}
												onClick={cls}
												className='sbsf-s-box'
											>
												<h2>{blog.title}</h2>

												<p>{extractFirstParagraph(blog.description ?? '')}</p>
											</Link>
										)
									})}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	)
}
