'use client'

import axios from 'axios'
import Head from 'next/head'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IPhoto } from '@/models/photo'
import { Photo, DashboardHeader, LoginLayout } from '@/components/shared'

const EditPhotoPage = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IPhoto | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/photos?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PHOTOS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>Update Photo</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Edit" subtitle={productInfo?.title || ''} breadcrumbs={['gallery']} />

				<div className="mt-3">{productInfo && <Photo {...productInfo} />}</div>
			</div>
		</LoginLayout>
	)
}

export default EditPhotoPage
