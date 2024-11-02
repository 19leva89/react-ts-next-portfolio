import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { DashboardHeader } from '@/components'

const DeleteBlog = () => {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

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

			<div className="content-page">
				<DashboardHeader
					title="Delete"
					subtitle={productInfo?.title}
					icon={RiArrowRightDoubleFill}
					breadcrumb="delete blog"
				/>

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
		</>
	)
}

export default DeleteBlog
