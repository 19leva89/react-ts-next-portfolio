'use client'

import axios from 'axios'
import Form from 'next/form'
import Image from 'next/image'

import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactSortable } from 'react-sortablejs'
import { ChangeEvent, useEffect, useState } from 'react'

import { IBlog } from '@/models/blog'
import { DynamicMarkdownEditor, Spinner } from '@/components/shared'

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
	const [redirect, setRedirect] = useState<boolean>(false)

	const [title, setTitle] = useState<string>(existingTitle || '')
	const [slug, setSlug] = useState<string>(existingSlug || '')
	const [images, setImages] = useState<string[]>(existingImages || [])
	const [description, setDescription] = useState<string>(existingDescription || '')
	const [blogCategory, setBlogCategory] = useState<string[]>(existingBlogCategory || [])
	const [tags, setTags] = useState<string[]>(existingTags || [])
	const [status, setStatus] = useState<string>(existingStatus || '')

	// for images uploading
	const [isUploading, setIsUploading] = useState<boolean>(false)

	const uploadImagesQuery: Promise<any>[] = []

	const createBlog = async () => {
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
		const newSlug = inputValue.toLowerCase().replace(/\s+/g, '-')

		setSlug(newSlug)
	}

	// Handle redirect in useEffect to avoid calling router.push during render
	useEffect(() => {
		if (redirect) {
			router.push('/blogs')
		}
	}, [redirect, router])

	return (
		<Form className='add-website-form' action='' onSubmit={createBlog}>
			{/* blog title */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='title'>
					Title <span className='text-red-500'>*</span>
				</label>

				<input
					type='text'
					id='title'
					placeholder='Enter small title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			{/* blog slug url */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='slug'>
					Slug (seo friendly url) <span className='text-red-500'>*</span>
				</label>

				<input
					type='text'
					id='slug'
					placeholder='Enter slug url'
					value={slug}
					onChange={handleSlugChange}
					required
				/>
			</div>

			{/* blog category */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='category'>Select category (for multiple press Ctrl + mouse left key)</label>

				<select
					name='category'
					id='category'
					value={blogCategory}
					onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value='node-js'>Node JS</option>
					<option value='react-js'>React JS</option>
					<option value='next-js'>Next JS</option>
					<option value='css'>CSS</option>
					<option value='digital-marketing'>Digital Marketing</option>
					<option value='flutter-dev'>Flutter Dev</option>
					<option value='database'>Database</option>
					<option value='deployment'>Deployment</option>
				</select>
			</div>

			{/* blog images */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<div className='w-full'>
					<label htmlFor='images'>Images (first image will be shown as thumbnail, you can drag)</label>

					<input
						type='file'
						id='fileInput'
						className='mt-4'
						accept='image/*'
						onChange={uploadImages}
						multiple
					/>
				</div>

				<div className='mt-4 flex w-full items-start justify-start'>{isUploading && <Spinner />}</div>
			</div>

			{/* image preview and image sortable with delete image */}
			{!isUploading && images?.length > 0 && (
				<div className='mb-8 flex items-center'>
					<ReactSortable
						list={Array.isArray(images) ? images.map((link) => ({ id: link, content: link })) : []}
						setList={updateImagesOrder}
						animation={200}
						className='flex flex-wrap items-center gap-4'
					>
						{images?.map((link, index) => (
							<div key={link} className='uploaded-img'>
								<Image src={link} alt='image' className='object-cover' width={150} height={80} />

								<div className='delete-img'>
									<button onClick={() => handleDeleteImage(index)}>
										<Trash2Icon size={15} />
									</button>
								</div>
							</div>
						))}
					</ReactSortable>
				</div>
			)}

			{/* markdown description */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='description'>
					Blog content (for image: first upload and copy link and paste in ![alt text](link))
				</label>

				<DynamicMarkdownEditor value={description} onChange={(value) => setDescription(value)} />
			</div>

			{/* tags */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='tags'>Tags</label>
				<select
					name='tags'
					id='tags'
					value={tags}
					onChange={(e) => setTags(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value='html'>HTML</option>
					<option value='css'>CSS</option>
					<option value='java-script'>Java Script</option>
					<option value='next-js'>Next JS</option>
					<option value='react-js'>React JS</option>
					<option value='database'>Database</option>
				</select>
			</div>

			{/* blog status */}
			<div className='mb-8 flex w-full flex-col items-start justify-start'>
				<label htmlFor='status'>
					Status <span className='text-red-500'>*</span>
				</label>
				<select name='status' id='status' value={status} onChange={(e) => setStatus(e.target.value)} required>
					<option value=''>No select</option>
					<option value='draft'>Draft</option>
					<option value='publish'>Publish</option>
				</select>
			</div>

			<div className='mb-4 w-full'>
				<button
					className='w-full justify-center rounded-[10px] border-none bg-[#8667b0] px-4 py-4 text-[1.4rem] text-white uppercase transition-all duration-300 ease-in-out outline-none hover:bg-[#7734d3]'
					type='submit'
				>
					Save blog
				</button>
			</div>
		</Form>
	)
}
