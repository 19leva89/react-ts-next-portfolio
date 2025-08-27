'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IPhoto } from '@/models/photo'
import { Photo, DashboardHeader } from '@/components/shared'

export const EditPhotoView = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IPhoto | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/photos?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PHOTOS_EDIT] Data load error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Edit' subtitle={productInfo?.title || ''} breadcrumbs={['gallery']} />

			<div className='mt-12'>{productInfo && <Photo {...productInfo} />}</div>
		</div>
	)
}
