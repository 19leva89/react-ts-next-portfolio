import axios from 'axios'
import Image from 'next/image'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { useRouter } from 'next/router'
import { ReactSortable } from 'react-sortablejs'
import { MdDeleteForever } from 'react-icons/md'
import { ChangeEvent, FormEvent, useState } from 'react'

import { IBlog } from '@/models/blog'
import { CodeBlock, Spinner } from '@/components'

export const Blog = ({
	_id,
	title: existingTitle,
	slug: existingSlug,
	images: existingImages,
	description: existingDescription,
	blogCategory: existingBlogCategory,
	tags: existingTags,
	status: existingStatus,
}: IBlog) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState(false)

	const [title, setTitle] = useState(existingTitle || '')
	const [slug, setSlug] = useState(existingSlug || '')
	const [images, setImages] = useState(existingImages || [])
	const [description, setDescription] = useState(existingDescription || '')
	const [blogCategory, setBlogCategory] = useState(existingBlogCategory || [])
	const [tags, setTags] = useState(existingTags || [])
	const [status, setStatus] = useState(existingStatus || '')

	// for images uploading
	const [isUploading, setIsUploading] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadImagesQuery: Promise<any>[] = []

	const createBlog = async (e: FormEvent) => {
		e.preventDefault()

		if (isUploading) {
			await Promise.all(uploadImagesQuery)
		}

		const data = { title, slug, images, description, blogCategory, tags, status }

		if (_id) {
			await axios.put(`/api/blogs`, { ...data, _id })

			toast.success('Blog updated successfully')
		} else {
			await axios.post(`/api/blogs`, data)

			toast.success('Blog created successfully')
		}

		setRedirect(true)
	}

	const uploadImages = async (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target?.files

		if (files && files.length > 0) {
			setIsUploading(true)

			const fileArray = Array.from(files)

			for (const file of fileArray) {
				const data = new FormData()
				data.append('file', file)

				// use the axios post method and push the promise to the query
				uploadImagesQuery.push(
					axios.post('/api/upload', data).then((res) => setImages((old) => [...old, ...res.data.links])),
				)
			}

			// wait for all images to be uploaded
			await Promise.all(uploadImagesQuery)

			setIsUploading(false)

			toast.success('Images uploaded successfully')
		} else {
			toast.error('An error occurred while uploading images!')
		}
	}

	const updateImagesOrder = (images: { id: string; content: string }[]) => {
		const imageLinks = images.map((image) => image.content)
		setImages(imageLinks)
	}

	const handleDeleteImage = (index: number) => {
		const updatedImages = [...images]
		updatedImages.splice(index, 1)

		setImages(updatedImages)

		toast.success('Image deleted successfully')
	}

	// for slug url
	const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		const newSlug = inputValue.replace(/\s+/g, '-')

		setSlug(newSlug)
	}

	if (redirect) {
		router.push('/blogs')
		return null
	}

	return (
		<form className="add-website-form" onSubmit={createBlog}>
			{/* blog title */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					placeholder="Enter small title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			{/* blog slug url */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="slug">Slug (seo friendly url)</label>
				<input type="text" id="slug" placeholder="Enter slug url" value={slug} onChange={handleSlugChange} />
			</div>

			{/* blog category */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="category">Select category (for multiple press Ctrl + mouse left key)</label>
				<select
					name="category"
					id="category"
					value={blogCategory}
					onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value="node-js">Node JS</option>
					<option value="react-js">React JS</option>
					<option value="next-js">Next JS</option>
					<option value="css">CSS</option>
					<option value="digital-marketing">Digital Marketing</option>
					<option value="flutter-dev">Flutter Dev</option>
					<option value="database">Database</option>
					<option value="deployment">Deployment</option>
				</select>
			</div>

			{/* blog images */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<div className="w-100">
					<label htmlFor="images">Images (first image will be shown as thumbnail, you can drag)</label>
					<input
						type="file"
						id="fileInput"
						className="mt-1"
						accept="image/*"
						onChange={uploadImages}
						multiple
					/>
				</div>

				<div className="w-100 flex flex-left mt-1">{isUploading && <Spinner />}</div>
			</div>

			{/* image preview and image sortable with delete image */}
			{!isUploading && images?.length > 0 && (
				<div className="flex">
					<ReactSortable
						list={Array.isArray(images) ? images.map((link) => ({ id: link, content: link })) : []}
						setList={updateImagesOrder}
						animation={200}
						className="flex gap-1"
					>
						{images?.map((link, index) => (
							<div key={link} className="uploaded-img">
								<Image src={link} alt="image" className="object-cover" width={150} height={80} />

								<div className="delete-img">
									<button onClick={() => handleDeleteImage(index)}>
										<MdDeleteForever />
									</button>
								</div>
							</div>
						))}
					</ReactSortable>
				</div>
			)}

			{/* markdown description */}
			<div className="description w-100 flex flex-col flex-left mb-2">
				<label htmlFor="description">
					Blog content (for image: first upload and copy link and paste in ![alt text](link))
				</label>

				<MarkdownEditor
					style={{ width: '100%', height: '400px' }}
					value={description}
					onChange={(e) => setDescription(e.text)}
					renderHTML={(text) => (
						<ReactMarkdown
							components={{
								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								code: (props: any) => <CodeBlock {...props} inline={false} />,
							}}
						>
							{text}
						</ReactMarkdown>
					)}
				/>
			</div>

			{/* tags */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="tags">Tags</label>
				<select
					name="tags"
					id="tags"
					value={tags}
					onChange={(e) => setTags(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value="html">HTML</option>
					<option value="css">CSS</option>
					<option value="java-script">Java Script</option>
					<option value="next-js">Next JS</option>
					<option value="react-js">React JS</option>
					<option value="database">Database</option>
				</select>
			</div>

			{/* blog status */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="status">Status</label>
				<select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="">No select</option>
					<option value="draft">Draft</option>
					<option value="publish">Publish</option>
				</select>
			</div>

			<div className="w-100 mb-1">
				<button className="w-100 flex-center" type="submit">
					SAVE BLOG
				</button>
			</div>
		</form>
	)
}