'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IBlog } from '@/models/blog'
import { DashboardHeader } from '@/components/shared'

export const DeleteBlogView = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [blogInfo, setBlogInfo] = useState<IBlog | null>(null)
	const [isDeleting, setIsDeleting] = useState<boolean>(false)

	const goBack = () => {
		router.push('/blogs')
	}

	const deleteBlog = async () => {
		try {
			setIsDeleting(true)

			await axios.delete(`/api/blogs?id=${encodeURIComponent(id)}`)

			toast.success('Blog deleted successfully')

			goBack()
		} catch (error) {
			console.error('[BLOGS_DELETE] Error deleting:', error)
		} finally {
			setIsDeleting(false)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchBlog = async () => {
			try {
				const res = await axios.get(`/api/blogs?id=${encodeURIComponent(id)}`)

				setBlogInfo(res.data)
			} catch (error) {
				console.error('[BLOGS_DELETE] Error loading data:', error)
			}
		}

		fetchBlog()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Delete' subtitle={blogInfo?.title || ''} breadcrumbs={['blogs']} />

			<div className='delete-sec flex h-screen w-screen items-center justify-center'>
				<div className='delete-card'>
					<Trash2Icon size={60} color='red' />

					<p className='cookie-heading'>Are you sure?</p>

					<p className='cookie-description'>If you delete this blog, it will be permanently removed</p>

					<div className='button-container'>
						<button onClick={deleteBlog} disabled={isDeleting} className='accept-button'>
							{isDeleting ? 'Deleting...' : 'Delete'}
						</button>

						<button onClick={goBack} className='decline-button'>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
