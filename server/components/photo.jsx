import axios from 'axios'
import toast from 'react-hot-toast'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { ReactSortable } from 'react-sortablejs'
import { MdDeleteForever } from 'react-icons/md'

import { Spinner } from '@/components'

export const Photo = ({ _id, title: existingTitle, slug: existingSlug, images: existingImages }) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState(false)

	const [title, setTitle] = useState(existingTitle || '')
	const [slug, setSlug] = useState(existingSlug || '')
	const [images, setImages] = useState(existingImages || [])

	// for images uploading
	const [isUploading, setIsUploading] = useState(false)
	const uploadImagesQuery = []

	const createPhoto = async (e) => {
		e.preventDefault()

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

	const uploadImages = async (e) => {
		const files = e.target?.files

		if (files?.length > 0) {
			setIsUploading(true)

			for (const file of files) {
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

	const updateImagesOrder = (images) => {
		setImages(images)
	}

	const handleDeleteImage = (index) => {
		const updatedImages = [...images]
		updatedImages.splice(index, 1)

		setImages(updatedImages)

		toast.success('Image deleted successfully')
	}

	// for slug url
	const handleSlugChange = (e) => {
		const inputValue = e.target.value
		const newSlug = inputValue.replace(/\s+/g, '-')

		setSlug(newSlug)
	}

	if (redirect) {
		router.push('/gallery')
		return null
	}

	return (
		<form className="add-website-form" onSubmit={createPhoto}>
			{/* photo title */}
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

			{/* photo images */}
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
						list={Array.isArray(images) ? images : []}
						setList={updateImagesOrder}
						animation={200}
						className="flex gap-1"
					>
						{images?.map((link, index) => (
							<div key={link} className="uploaded-img">
								<img src={link} alt="image" className="object-cover" width={150} height={80} />

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
				<button className="w-100 flex-center" type="submit">
					SAVE PHOTO
				</button>
			</div>
		</form>
	)
}
