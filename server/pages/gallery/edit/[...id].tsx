import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { IPhoto } from '@/models/photo'
import { Photo, DashboardHeader, LoginLayout } from '@/components'

const EditPhoto = () => {
	const router = useRouter()

	const { id } = router.query

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
				<DashboardHeader
					title="Edit"
					subtitle={productInfo ? productInfo.title : ''}
					icon={RiArrowRightDoubleFill}
					breadcrumb="edit photo"
				/>

				<div className="mt-3">{productInfo && <Photo {...productInfo} />}</div>
			</div>
		</LoginLayout>
	)
}

export default EditPhoto
