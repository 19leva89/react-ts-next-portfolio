'use client'

import axios from 'axios'
import Form from 'next/form'
import Image from 'next/image'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { MdDeleteForever } from 'react-icons/md'

import { Spinner } from '@/components/shared'
import { IPhoto } from '@/models/photo'

export const Photo = ({ _id, title: existingTitle, slug: existingSlug, images: existingImages }: IPhoto) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState<boolean>(false)

	const [title, setTitle] = useState<string>(existingTitle || '')
	const [slug, setSlug] = useState<string>(existingSlug || '')
	const [images, setImages] = useState<string[]>(existingImages || [])

	// for images uploading
	const [isUploading, setIsUploading] = useState<boolean>(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadImagesQuery: Promise<any>[] = []

	const createPhoto = async () => {
		if (isUploading) {
			await Promise.all(uploadImagesQuery)
		}

		const data = { title, slug, images }

		if (_id) {
			await axios.put(`/api/photos`, { ...data, _id })

			toast.success('Photo updated successfully')
		} else {
			await axios.post(`/api/photos`, data)

			toast.success('Photo created successfully')
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

	if (redirect) {
		router.push('/gallery')
		return null
	}

	return (
		<Form className="add-website-form" action="" onSubmit={createPhoto}>
			{/* photo title */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="title">
					Title <span className="text-required">*</span>
				</label>
				<input
					type="text"
					id="title"
					placeholder="Enter small title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
			</div>

			{/* blog slug url */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="slug">
					Slug (seo friendly url) <span className="text-required">*</span>
				</label>
				<input
					type="text"
					id="slug"
					placeholder="Enter slug url"
					value={slug}
					onChange={handleSlugChange}
					required
				/>
			</div>

			{/* photo images */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<div className="w-100">
					<label htmlFor="images">
						Images (first image will be shown as thumbnail, you can drag){' '}
						<span className="text-required">*</span>
					</label>
					<input
						type="file"
						id="fileInput"
						className="mt-1"
						accept="image/*"
						onChange={uploadImages}
						multiple
						required
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
						className="flex flex-wrap gap-1"
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

			<div className="w-100 mb-1">
				<button className="w-100 flex-center uppercase" type="submit">
					Save photo
				</button>
			</div>
		</Form>
	)
}
