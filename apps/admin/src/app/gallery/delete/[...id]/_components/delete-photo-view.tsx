'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IPhoto } from '@/models/photo'
import { DashboardHeader } from '@/components/shared'

export const DeletePhotoView = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const [photoInfo, setPhotoInfo] = useState<IPhoto | null>(null)

	const goBack = () => {
		router.push('/gallery')
	}

	const deletePhoto = async () => {
		try {
			setIsDeleting(true)

			await axios.delete(`/api/photos?id=${encodeURIComponent(id)}`)

			toast.success('Photo deleted successfully')

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

		const fetchPhoto = async () => {
			try {
				const res = await axios.get(`/api/photos?id=${encodeURIComponent(id)}`)

				setPhotoInfo(res.data)
			} catch (error) {
				console.error('[PHOTOS_DELETE] Error loading data:', error)
			}
		}

		fetchPhoto()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Delete' subtitle={photoInfo?.title || ''} breadcrumbs={['gallery']} />

			<div className='delete-sec flex h-screen w-screen items-center justify-center'>
				<div className='delete-card'>
					<Trash2Icon size={60} color='red' />

					<p className='cookie-heading'>Are you sure?</p>

					<p className='cookie-description'>If you delete this photo, it will be permanently removed</p>

					<div className='button-container'>
						<button onClick={deletePhoto} disabled={isDeleting} className='accept-button'>
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
