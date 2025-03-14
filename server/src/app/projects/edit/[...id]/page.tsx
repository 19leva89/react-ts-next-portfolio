'use client'

import axios from 'axios'
import Head from 'next/head'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import { IProject } from '@/models/project'
import { Project, DashboardHeader } from '@/components/shared'

const EditProjectPage = () => {
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IProject | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/projects?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PROJECTS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<>
			<Head>
				<title>Update Project</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Edit" subtitle={productInfo?.title || ''} breadcrumbs={['projects']} />

				<div className="mt-3">{productInfo && <Project {...productInfo} />}</div>
			</div>
		</>
	)
}

export default EditProjectPage
