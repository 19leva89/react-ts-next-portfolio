import Head from 'next/head'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { useRouter } from 'next/router'
import { FreeMode } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Spinner } from '@/components'
import { CodeBlock } from '@/lib/code-block'
import { useFetchData } from '@/hooks/use-fetch-data'

const ShopSlug = () => {
	const router = useRouter()

	const { slug } = router.query
	const { allData, loading } = useFetchData(`/api/shops?slug=${slug}`)

	const [mainImage, setMainImage] = useState('')

	const createdAtData = allData[0]?.createdAt ? new Date(allData[0]?.createdAt) : null

	// function to handle click on product list image
	const handleImageClick = (image) => {
		setMainImage(image)
	}

	// useEffect to set mainImage once allData is available
	useEffect(() => {
		if (allData && allData.length > 0 && allData[0]?.images[0]) {
			setMainImage(allData[0]?.images[0])
		}
	}, [allData])

	return (
		<>
			<Head>
				<title>Shop Page</title>
			</Head>

			<div className="shop-slug-page">
				<div className="shop-content">
					<div className="container">
						<div className="shop-cont-box">
							<div className="left-shop-img-box">
								<div className="left-shop-main-img">
									{loading ? (
										<Spinner />
									) : (
										<img src={mainImage || '/img/no-image.png'} alt={allData[0]?.title} />
									)}
								</div>

								<div className="left-s-img-box-list">
									<Swiper
										slidesPerView={'auto'}
										spaceBetween={30}
										freeMode={true}
										grabCursor={true}
										modules={[FreeMode]}
										className="mySwiper"
									>
										{allData[0]?.images.map((image, index) => (
											<SwiperSlide key={index}>
												<img src={image} alt={allData[0]?.title} onClick={() => handleImageClick(image)} />
											</SwiperSlide>
										))}
									</Swiper>
								</div>
							</div>

							<div className="right-shop-cont-box">
								<h1>{allData[0]?.title}</h1>

								<h3 className="right-shop-price">
									Price: <span>$ {allData[0]?.price}</span>
								</h3>

								<a href={allData[0]?.affiliateLink} target="_blank" rel="noreferrer" className="shop-now-btn">
									Shop Now
								</a>

								<div className="blog-content">
									<h2 className="bc-title">Product Details:</h2>

									<ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
										{allData[0]?.description}
									</ReactMarkdown>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ShopSlug
