import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Pagination, Spinner } from '@/components'
import { useFetchData } from '@/hooks/use-fetch-data'

const Category = () => {
	const router = useRouter()
	const { category } = router.query

	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// fetch content data
	const { allData, loading } = useFetchData(`/api/blogs?blogCategory=${category}`)

	// handle page change
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// filter all data based on search query
	const filteredContent = allData
		.filter((item) => item.category === item.category)
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		.slice(0, 20)
		.reverse()

	// total pages
	const totalPages = Math.ceil(filteredContent.length / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content
	const currentContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	const publishedContent = currentContent.filter((content) => content.status === 'publish')

	return (
		<>
			<Head>
				<title>Blog category page</title>
			</Head>

			<div className="blog-category">
				<section className="top-hero">
					<div className="container">
						<div className="top-title">
							<div className="top-title-cont flex">
								<h1>
									Category{' '}
									<span>
										{category
											? category
													.replace(/-/g, ' ')
													.split(' ')
													.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
													.join(' ')
											: 'Loading...'}
									</span>
								</h1>
							</div>
						</div>
					</div>
				</section>

				<section className="latest-posts-sec">
					<div className="container">
						<div className="border" />

						<div className="latest-posts-data">
							<div className="fe-title">
								<h3>
									{category
										? category
												.replace(/-/g, ' ')
												.split(' ')
												.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
												.join(' ') + ' articles'
										: 'Loading...'}
								</h3>
							</div>

							<div className="latest-posts">
								{loading ? (
									<div className="flex flex-center wh_50">
										<Spinner />
									</div>
								) : (
									publishedContent.map((content) => (
										<div key={content._id} className="l-post">
											<div className="l-post-img">
												<Link href={`/blogs/${content.slug}`}>
													<img src={content.images[0] || '/img/no-image.png'} alt={content.title} />
												</Link>

												<Swiper
													slidesPerView={'auto'}
													spaceBetween={0}
													freeMode={true}
													grabCursor={true}
													modules={[FreeMode]}
													className="tagsSwiper"
												>
													{content.blogCategory.map((cat, index) => (
														<SwiperSlide key={index}>
															<Link href={cat} className="ai">
																<span />
																{cat.replace(/-/g, ' ')}
															</Link>
														</SwiperSlide>
													))}
												</Swiper>
											</div>

											<div className="l-post-info">
												<h3>
													<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
												</h3>

												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem. </p>

												<h4 className="flex">
													<img src="/img/coder-white.png" alt="author" />
													<span>by sobolev</span>
												</h4>
											</div>
										</div>
									))
								)}
							</div>
						</div>

						{/* for pagination */}
						{publishedContent.length > 0 && (
							<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
						)}
					</div>
				</section>
			</div>
		</>
	)
}

export default Category
