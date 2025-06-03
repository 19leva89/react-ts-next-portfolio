'use client'

import axios from 'axios'
import Head from 'next/head'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IBlog } from '@/models/blog'
import { DashboardHeader } from '@/components/shared'

const DeleteBlogPage = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [productInfo, setProductInfo] = useState<IBlog | null>(null)

	const goBack = () => {
		router.push('/blogs')
	}

	const deleteProduct = async () => {
		try {
			await axios.delete(`/api/blogs?id=${id}`)

			toast.success('Blog deleted successfully')

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
				const res = await axios.get(`/api/blogs?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[BLOGS_DELETE] Error loading data:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<>
			<Head>
				<title>Delete Blog</title>
			</Head>

			<div className='content-page'>
				<DashboardHeader title='Delete' subtitle={productInfo?.title || ''} breadcrumbs={['blogs']} />

				<div className='delete-sec flex h-screen w-screen items-center justify-center'>
					<div className='delete-card'>
						<Trash2Icon size={60} color='red' />

						<p className='cookie-heading'>Are you sure?</p>

						<p className='cookie-description'>
							If you delete this website content, it will be permanent delete your content
						</p>

						<div className='button-container'>
							<button onClick={deleteProduct} className='accept-button'>
								Delete
							</button>

							<button onClick={goBack} className='decline-button'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DeleteBlogPage
