import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Shop, DashboardHeader, LoginLayout } from '@/components'

const EditProduct = () => {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/shops?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('[PRODUCTS_EDIT] Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>Update Product</title>
			</Head>

			<div className="content-page">
				<DashboardHeader
					title="Edit"
					subtitle={productInfo ? productInfo.title : ''}
					icon={RiArrowRightDoubleFill}
					breadcrumb="edit product"
				/>

				<div className="mt-3">{productInfo && <Shop {...productInfo} />}</div>
			</div>
		</LoginLayout>
	)
}

export default EditProduct
