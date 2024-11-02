import axios from 'axios'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { ReactSortable } from 'react-sortablejs'
import { MdDeleteForever } from 'react-icons/md'

import { Spinner } from '@/components'

export const Shop = ({
	_id,
	title: existingTitle,
	slug: existingSlug,
	images: existingImages,
	description: existingDescription,
	tags: existingTags,
	affiliateLink: existingAffiliateLink,
	price: existingPrice,
	status: existingStatus,
}) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState(false)

	const [title, setTitle] = useState(existingTitle || '')
	const [slug, setSlug] = useState(existingSlug || '')
	const [images, setImages] = useState(existingImages || [])
	const [description, setDescription] = useState(existingDescription || '')
	const [tags, setTags] = useState(existingTags || [])
	const [affiliateLink, setAffiliateLink] = useState(existingAffiliateLink || '')
	const [price, setPrice] = useState(existingPrice || '')
	const [status, setStatus] = useState(existingStatus || '')

	// for images uploading
	const [isUploading, setIsUploading] = useState(false)
	const uploadImagesQuery = []

	const createProduct = async (e) => {
		e.preventDefault()

		if (isUploading) {
			await Promise.all(uploadImagesQuery)
		}

		const data = { title, slug, images, description, tags, affiliateLink, price, status }

		if (_id) {
			await axios.put(`/api/shops`, { ...data, _id })

			toast.success('Product updated successfully')
		} else {
			await axios.post(`/api/shops`, data)

			toast.success('Product created successfully')
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
		router.push('/shops')
		return null
	}

	return (
		<form className="add-website-form" onSubmit={createProduct}>
			{/* product title */}
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

			{/* product affiliate link */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="affiliateLink">Affiliate link</label>
				<input
					type="text"
					id="affiliateLink"
					placeholder="Enter affiliate link"
					value={affiliateLink}
					onChange={(e) => setAffiliateLink(e.target.value)}
				/>
			</div>

			{/* product live preview */}
			<div className="w-100 flex flex-col flex-left mb-2">
				<label htmlFor="price">Price</label>
				<input
					type="text"
					id="price"
					placeholder="Enter price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</div>

			{/* product images */}
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

			{/* markdown description */}
			<div className="description w-100 flex flex-col flex-left mb-2">
				<label htmlFor="description">
					Product content (for image: first upload and copy link and paste in ![alt text](link))
				</label>

				<MarkdownEditor
					style={{ width: '100%', height: '400px' }}
					value={description}
					onChange={(e) => setDescription(e.text)}
					renderHTML={(text) => (
						<ReactMarkdown
							components={{
								code: ({ node, inline, className, children, ...props }) => {
									// for code product
									const match = /language-(\w+)/.exec(className || '')

									if (inline) {
										return <code>{children}</code>
									} else if (match) {
										return (
											<div style={{ position: 'relative' }}>
												<pre
													style={{
														padding: '0',
														borderRadius: '5px',
														overflow: 'auto',
														whiteSpace: 'pre-wrap',
													}}
													{...props}
												>
													<code>{children}</code>
												</pre>

												<button
													style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
													onClick={() => navigator.clipboard.writeText(children)}
												>
													copy code
												</button>
											</div>
										)
									} else {
										return <code {...props}>{children}</code>
									}
								},
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
					<option value="adapter">Adapter</option>
					<option value="usb-c">USB C</option>
					<option value="graphic">Graphic</option>
					<option value="gimbal">Gimbal</option>
					<option value="content-creators">Content Creators</option>
					<option value="desk">Desk</option>
					<option value="standing-desk">Standing Desk</option>
				</select>
			</div>

			{/* product status */}
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
					SAVE PRODUCT
				</button>
			</div>
		</form>
	)
}
