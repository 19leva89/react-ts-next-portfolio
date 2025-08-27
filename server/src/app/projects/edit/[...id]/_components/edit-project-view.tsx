'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IProject } from '@/models/project'
import { Project, DashboardHeader } from '@/components/shared'

export const EditProjectView = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IProject | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/projects?id=${encodeURIComponent(id)}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PROJECTS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Edit' subtitle={productInfo?.title || ''} breadcrumbs={['projects']} />

			<div className='mt-12'>{productInfo && <Project {...productInfo} />}</div>
		</div>
	)
}
