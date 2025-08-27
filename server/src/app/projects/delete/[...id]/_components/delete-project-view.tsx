'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IProject } from '@/models/project'
import { DashboardHeader } from '@/components/shared'

export const DeleteProjectView = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const [productInfo, setProductInfo] = useState<IProject | null>(null)

	const goBack = () => {
		router.push('/projects')
	}

	const deleteProject = async () => {
		try {
			setIsDeleting(true)

			await axios.delete(`/api/projects?id=${encodeURIComponent(id)}`)

			toast.success('Project deleted successfully')

			goBack()
		} catch (error) {
			console.error('[PROJECTS_DELETE] Error deleting:', error)
		} finally {
			setIsDeleting(false)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProject = async () => {
			try {
				const res = await axios.get(`/api/projects?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PROJECTS_DELETE] Error loading data:', error)
			}
		}

		fetchProject()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Delete' subtitle={productInfo?.title || ''} breadcrumbs={['projects']} />

			<div className='delete-sec flex h-screen w-screen items-center justify-center'>
				<div className='delete-card'>
					<Trash2Icon size={60} color='red' />

					<p className='cookie-heading'>Are you sure?</p>

					<p className='cookie-description'>If you delete this project, it will be permanently removed</p>

					<div className='button-container'>
						<button onClick={deleteProject} disabled={isDeleting} className='accept-button'>
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
