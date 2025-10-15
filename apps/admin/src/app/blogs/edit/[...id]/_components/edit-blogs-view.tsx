'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IBlog } from '@/models/blog'
import { Blog, DashboardHeader } from '@/components/shared'

export const EditBlogsView = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IBlog | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/blogs?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[BLOGS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Edit' subtitle={productInfo?.title || ''} breadcrumbs={['blogs']} />

			<div className='mt-12'>{productInfo && <Blog {...productInfo} />}</div>
		</div>
	)
}
