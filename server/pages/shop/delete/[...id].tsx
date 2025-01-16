import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'

import { IShop } from '@/models/shop'
import { DashboardHeader, LoginLayout } from '@/components'

const DeleteProduct = () => {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState<IShop | null>(null)

	const goBack = () => {
		router.push('/shop')
	}

	const deleteProduct = async () => {
		try {
			await axios.delete(`/api/shops?id=${id}`)

			toast.success('Product deleted successfully')

			goBack()
		} catch (error) {
			console.error('[PRODUCTS_DELETE] Error deleting:', error)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/shops?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PRODUCTS_DELETE] Error loading data:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>Delete Product</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Delete" subtitle={productInfo?.title || ''} breadcrumbs={['shop']} />

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

export default DeleteProduct
