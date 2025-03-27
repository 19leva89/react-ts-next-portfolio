'use client'

import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IProject } from '@/models/project'
import { DashboardHeader } from '@/components/shared'

const DeleteProjectPage = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IProject | null>(null)

	const goBack = () => {
		router.push('/projects')
	}

	const deleteProduct = async () => {
		try {
			await axios.delete(`/api/projects?id=${id}`)

			toast.success('Project deleted successfully')

			goBack()
		} catch (error) {
			console.error('[PROJECTS_DELETE] Error deleting:', error)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/projects?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PROJECTS_DELETE] Error loading data:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<>
			<Head>
				<title>Delete Project</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Delete" subtitle={productInfo?.title || ''} breadcrumbs={['projects']} />

				<div className="delete-sec flex items-center justify-center w-screen h-screen">
					<div className="delete-card">
						<Trash2Icon size={60} color="red" />

						<p className="cookie-heading">Are you sure?</p>

						<p className="cookie-description">
							If you delete this website content, it will be permanent delete your content
						</p>

						<div className="button-container">
							<button onClick={deleteProduct} className="accept-button">
								Delete
							</button>

							<button onClick={goBack} className="decline-button">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DeleteProjectPage
