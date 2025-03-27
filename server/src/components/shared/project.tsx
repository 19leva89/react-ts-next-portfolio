'use client'

import axios from 'axios'
import Form from 'next/form'
import Image from 'next/image'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'

import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import { IProject } from '@/models/project'
import { CodeBlock, Spinner } from '@/components/shared'

export const Project = ({
	_id,
	title: existingTitle,
	slug: existingSlug,
	images: existingImages,
	description: existingDescription,
	client: existingClient,
	designer: existingDesigner,
	projectCategory: existingProjectCategory,
	tags: existingTags,
	livePreview: existingLivePreview,
	status: existingStatus,
}: IProject) => {
	const router = useRouter()
	const [redirect, setRedirect] = useState<boolean>(false)

	const [title, setTitle] = useState<string>(existingTitle || '')
	const [slug, setSlug] = useState<string>(existingSlug || '')
	const [images, setImages] = useState<string[]>(existingImages || [])
	const [description, setDescription] = useState<string>(existingDescription || '')
	const [client, setClient] = useState<string>(existingClient || '')
	const [designer, setDesigner] = useState<string>(existingDesigner || '')
	const [livePreview, setLivePreview] = useState<string>(existingLivePreview || '')
	const [projectCategory, setProjectCategory] = useState<string[]>(existingProjectCategory || [])
	const [tags, setTags] = useState<string[]>(existingTags || [])
	const [status, setStatus] = useState<string>(existingStatus || '')

	// for images uploading
	const [isUploading, setIsUploading] = useState<boolean>(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const uploadImagesQuery: Promise<any>[] = []

	const createProject = async () => {
		if (isUploading) {
			await Promise.all(uploadImagesQuery)
		}

		const data = {
			title,
			slug,
			designer,
			images,
			description,
			client,
			livePreview,
			projectCategory,
			tags,
			status,
		}

		if (_id) {
			await axios.put(`/api/projects`, { ...data, _id })

			toast.success('Project updated successfully')
		} else {
			await axios.post(`/api/projects`, data)

			toast.success('Project created successfully')
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
		router.push('/projects')
		return null
	}

	return (
		<Form className="add-website-form" action="" onSubmit={createProject}>
			{/* project title */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="title">
					Title <span className="text-red-500">*</span>
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
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="slug">
					Slug (seo friendly url) <span className="text-red-500">*</span>
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

			{/* project client name */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="client">Client name</label>
				<input
					type="text"
					id="client"
					placeholder="Enter client name"
					value={client}
					onChange={(e) => setClient(e.target.value)}
				/>
			</div>

			{/* project live preview */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="livePreview">Live preview</label>
				<input
					type="text"
					id="livePreview"
					placeholder="Enter live preview url"
					value={livePreview}
					onChange={(e) => setLivePreview(e.target.value)}
				/>
			</div>

			{/* project category */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="category">Select category (for multiple press Ctrl + mouse left key)</label>
				<select
					name="category"
					id="category"
					value={projectCategory}
					onChange={(e) => setProjectCategory(Array.from(e.target.selectedOptions, (option) => option.value))}
					multiple
				>
					<option value="website-development">Website Development</option>
					<option value="app-development">App Development</option>
					<option value="design-system">Design System</option>
					<option value="website-migration">Website Migration</option>
					<option value="e-commerce-site">E-commerce Site</option>
					<option value="performance-evaluation">Performance Evaluation</option>
				</select>
			</div>

			{/* project designer */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="designer">Designer name</label>
				<input
					type="text"
					id="designer"
					placeholder="Enter designer name"
					value={designer}
					onChange={(e) => setDesigner(e.target.value)}
				/>
			</div>

			{/* project images */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<div className="w-full">
					<label htmlFor="images">Images (first image will be shown as thumbnail, you can drag)</label>
					<input
						type="file"
						id="fileInput"
						className="mt-4"
						accept="image/*"
						onChange={uploadImages}
						multiple
					/>
				</div>

				<div className="w-full flex items-start justify-start mt-4">{isUploading && <Spinner />}</div>
			</div>

			{/* image preview and image sortable with delete image */}
			{!isUploading && images?.length > 0 && (
				<div className="flex items-center">
					<ReactSortable
						list={Array.isArray(images) ? images.map((link) => ({ id: link, content: link })) : []}
						setList={updateImagesOrder}
						animation={200}
						className="flex items-center flex-wrap gap-4"
					>
						{images?.map((link, index) => (
							<div key={link} className="uploaded-img">
								<Image src={link} alt="image" className="object-cover" width={150} height={80} />

								<div className="delete-img">
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
			<div className="description w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="description">
					Project content (for image: first upload and copy link and paste in ![alt text](link))
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
			<div className="w-full flex flex-col items-start justify-start mb-8">
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

			{/* project status */}
			<div className="w-full flex flex-col items-start justify-start mb-8">
				<label htmlFor="status">
					Status <span className="text-red-500">*</span>
				</label>
				<select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
					<option value="">No select</option>
					<option value="draft">Draft</option>
					<option value="publish">Publish</option>
				</select>
			</div>

			<div className="w-full mb-4">
				<button className="w-full justify-center uppercase" type="submit">
					Save project
				</button>
			</div>
		</Form>
	)
}
