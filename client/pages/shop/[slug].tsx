import Head from 'next/head'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IShop } from '@/models/shop'
import { CodeBlock, Spinner } from '@/components'
import { useFetchData } from '@/hooks/use-fetch-data'

// swiper
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ShopSlug = () => {
	const router = useRouter()

	const { slug } = router.query as { slug: string }
	const { allData, loading } = useFetchData<IShop[]>(`/api/shops?slug=${slug}`)

	const [mainImage, setMainImage] = useState('')

	// useEffect to set mainImage once allData is available
	useEffect(() => {
		if (allData && allData.length > 0) {
			const images = allData[0]?.images
			if (images && images[0]) {
				setMainImage(images[0])
			}
		}
	}, [allData])

	// function to handle click on product list image
	const handleImageClick = (image: string) => {
		setMainImage(image)
	}

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
										<div className="wh-100 flex flex-center">
											<Spinner />
										</div>
									) : (
										<Image
											src={mainImage || '/img/no-image.png'}
											alt={allData && allData[0] ? allData[0].title : ''}
											width={650}
											height={450}
										/>
									)}
								</div>

								<div className="left-s-img-box-list">
									<Swiper
										slidesPerView={'auto'}
										spaceBetween={30}
										freeMode={true}
										grabCursor={true}
										modules={[Scrollbar]}
										scrollbar={{ draggable: true }}
										className="imageSwiper"
									>
										{allData &&
											allData[0] &&
											allData[0].images &&
											allData[0].images.map((image, index) => (
												<SwiperSlide key={index}>
													<Image
														src={image}
														alt={allData[0]?.title}
														onClick={() => handleImageClick(image)}
														width={250}
														height={250}
													/>
												</SwiperSlide>
											))}
									</Swiper>
								</div>
							</div>

							<div className="right-shop-cont-box">
								<h1>{allData?.[0].title}</h1>

								<h3 className="right-shop-price">
									Price: <span>$ {allData?.[0].price}</span>
								</h3>

								<a
									href={allData?.[0].affiliateLink}
									target="_blank"
									rel="noreferrer"
									className="shop-now-btn"
								>
									Shop Now
								</a>

								<div className="blog-content">
									<h2 className="bc-title">Product Details:</h2>

									<ReactMarkdown
										remarkPlugins={[remarkGfm]}
										components={{
											// eslint-disable-next-line @typescript-eslint/no-explicit-any
											code: (props: any) => <CodeBlock {...props} inline={false} />,
										}}
									>
										{allData?.[0].description}
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
