'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IShop } from '@/models/shop'
import { Shop, DashboardHeader } from '@/components/shared'

export const EditProductView = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IShop | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/shops?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PRODUCTS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Edit' subtitle={productInfo?.title || ''} breadcrumbs={['shop']} />

			<div className='mt-12'>{productInfo && <Shop {...productInfo} />}</div>
		</div>
	)
}
