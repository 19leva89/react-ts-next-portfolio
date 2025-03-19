'use client'

import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IPhoto } from '@/models/photo'
import { DashboardHeader } from '@/components/shared'

const DeletePhotoPage = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IPhoto | null>(null)

	const goBack = () => {
		router.push('/gallery')
	}

	const deleteProduct = async () => {
		try {
			await axios.delete(`/api/photos?id=${id}`)

			toast.success('Photo deleted successfully')

			goBack()
		} catch (error) {
			console.error('[BLOGS_DELETE] Error deleting:', error)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/photos?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PHOTOS_DELETE] Error loading data:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<>
			<Head>
				<title>Delete Photo</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Delete" subtitle={productInfo?.title || ''} breadcrumbs={['gallery']} />

				<div className="delete-sec flex items-center justify-center w-screen h-screen">
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
		</>
	)
}

export default DeletePhotoPage
