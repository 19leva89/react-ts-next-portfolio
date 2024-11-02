import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Blog, DashboardHeader, LoginLayout } from '@/components'

const EditBlog = () => {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/blogs?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[BLOGS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>Update Blog</title>
			</Head>

			<div className="content-page">
				<DashboardHeader
					title="Edit"
					subtitle={productInfo?.title}
					icon={RiArrowRightDoubleFill}
					breadcrumb="edit blog"
				/>

				<div className="mt-3">{productInfo && <Blog {...productInfo} />}</div>
			</div>
		</LoginLayout>
	)
}

export default EditBlog
