import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'

import { IProject } from '@/models/project'
import { DashboardHeader, LoginLayout } from '@/components'

const DeleteProject = () => {
	const router = useRouter()

	const { id } = router.query

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
		<LoginLayout>
			<Head>
				<title>Delete Project</title>
			</Head>

			<div className="content-page">
				<DashboardHeader
					title="Delete"
					subtitle={productInfo ? productInfo.title : ''}
					breadcrumbs={['projects']}
				/>

				<div className="delete-sec flex flex-center wh_100">
					<div className="delete-card">
						<TbTrashX size={60} color="red" />

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
		</LoginLayout>
	)
}

export default DeleteProject
