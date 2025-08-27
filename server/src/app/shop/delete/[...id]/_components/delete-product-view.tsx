'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IShop } from '@/models/shop'
import { DashboardHeader } from '@/components/shared'

export const DeleteProductView = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const [productInfo, setProductInfo] = useState<IShop | null>(null)

	const goBack = () => {
		router.push('/shop')
	}

	const deleteProduct = async () => {
		try {
			setIsDeleting(true)

			await axios.delete(`/api/shops?id=${encodeURIComponent(id)}`)

			toast.success('Product deleted successfully')

			goBack()
		} catch (error) {
			console.error('[PRODUCTS_DELETE] Error deleting:', error)
		} finally {
			setIsDeleting(false)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/shops?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PRODUCTS_DELETE] Error loading data:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Delete' subtitle={productInfo?.title || ''} breadcrumbs={['shop']} />

			<div className='delete-sec flex h-screen w-screen items-center justify-center'>
				<div className='delete-card'>
					<Trash2Icon size={60} color='red' />

					<p className='cookie-heading'>Are you sure?</p>

					<p className='cookie-description'>If you delete this product, it will be permanently removed</p>

					<div className='button-container'>
						<button onClick={deleteProduct} disabled={isDeleting} className='accept-button'>
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
