import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { useFetchData } from '@/hooks/use-fetch-data'
import { BlogSearch, Pagination, Spinner } from '@/components'

// swiper
import 'swiper/css'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Blogs = () => {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')
	const [searchInput, setSearchInput] = useState(false)

	// fetch content data
	const { allData, loading } = useFetchData('/api/blogs')

	// handle page change
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// filter all data based on search query
	const filteredContent =
		searchQuery.trim() === ''
			? allData
			: allData.filter((content) => content.title.toLowerCase().includes(searchQuery.toLowerCase()))

	// total pages
	const totalPages = Math.ceil(filteredContent.length / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content
	const currentContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	const publishedContent = currentContent.filter((content) => content.status === 'publish')

	const sliderPublishedData = allData.filter((content) => content.status === 'publish')

	const handleSearchOpen = () => {
		setSearchInput(!searchInput)
	}

	const handleSearchClose = () => {
		setSearchInput(false)
	}

	return (
		<>
			<Head>
				<title>Blogs</title>
			</Head>

			<div className="content-page">
				<section className="top-hero">
					<div className="container">
						<div className="top-title">
							<div className="top-title-cont flex">
								<h1 data-aos="fade-right">
									Welcome to <span>Blogs!</span>
								</h1>

								<p data-aos="fade-right">
									I write about web, mobile development and modern JavaScript frameworks. The best articles,
									links and news related to web and mobile development
								</p>

								<div className="sub-email" data-aos="fade-up">
									<form action="" className="flex">
										<input onClick={handleSearchOpen} type="text" placeholder="Search blogs here..." />

										<button>Search</button>
									</form>
								</div>
							</div>
						</div>

						<div className="featured">
							<div className="container">
								<div className="border" />

								<div className="featured-posts">
									<div className="fe-title flex">
										<h3 data-aos="fade-up">Featured Posts:</h3>
									</div>

									<div className="fe-posts flex">
										<Swiper
											slidesPerView={'auto'}
											freeMode={true}
											spaceBetween={30}
											className="mySwiper"
											modules={[FreeMode]}
										>
											{loading ? (
												<div className="flex flex-center">
													<Spinner />
												</div>
											) : (
												sliderPublishedData.slice(0, 6).map((content) => (
													<SwiperSlide
														key={content._id}
														data-aos="flip-left"
														data-aos-ease="ease-in-cubic"
														data-aos-duration="2000"
													>
														<div key={content._id} className="f-post">
															<Link href={`/blogs/${content.slug}`}>
																<img src={content.images[0] || '/img/no-image.png'} alt={content.title} />
															</Link>

															<div className="f-post-info">
																<h2>
																	<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
																</h2>

																<div className="f-post-by flex flex-sb">
																	<div className="flex gap-05">
																		<img src="/img/coder-white.png" alt="coder" />
																		<p>By Sobolev</p>
																	</div>

																	<div className="tags flex flex-nowrap">
																		{content.blogCategory.slice(0, 1).map((cat) => (
																			<Link key={cat} href={`blogs/category/${cat}`} className="ai">
																				<span />
																				{cat.replace(/-/g, ' ')}
																			</Link>
																		))}
																	</div>
																</div>
															</div>
														</div>
													</SwiperSlide>
												))
											)}
										</Swiper>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="popular-tags-sec">
					<div className="container">
						<div className="border" />

						<div className="popular-tags-data">
							<div className="fe-title">
								<h3>Popular Tags:</h3>
							</div>

							<div className="popu-tags">
								<Link href="/blogs/category/next-js" className="p-tag" data-aos="fade-right">
									<img src="/img/next-js.png" alt="next js" />

									<div className="tags">
										<div className="apps">
											<span />
											Next JS
										</div>
									</div>
								</Link>

								<Link href="/blogs/category/node-js" className="p-tag" data-aos="fade-right">
									<img src="/img/node-js.png" alt="node js" />

									<div className="tags">
										<div className="apps">
											<span />
											Node JS
										</div>
									</div>
								</Link>

								<Link href="/blogs/category/react-js" className="p-tag" data-aos="fade-right">
									<img src="/img/react-js.gif" alt="react js" />

									<div className="tags">
										<div className="apps">
											<span />
											React JS
										</div>
									</div>
								</Link>

								<Link href="/blogs/category/digital-marketing" className="p-tag" data-aos="fade-left">
									<img src="/img/digital-marketing.png" alt="digital marketing" />

									<div className="tags">
										<div className="apps">
											<span />
											Digital
										</div>
									</div>
								</Link>

								<Link href="/blogs/category/flutter-dev" className="p-tag" data-aos="fade-left">
									<img src="/img/flutter-dev.png" alt="flutter dev" />

									<div className="tags">
										<div className="apps">
											<span />
											Flutter
										</div>
									</div>
								</Link>

								<Link href="/blogs/category/css" className="p-tag" data-aos="fade-left">
									<img src="/img/css.png" alt="css" />

									<div className="tags">
										<div className="apps">
											<span />
											CSS
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="latest-posts-sec">
					<div className="container">
						<div className="border" />

						<div className="latest-posts-data">
							<div className="fe-title">
								<h3>Latest Articles:</h3>
							</div>

							<div className="latest-posts">
								{loading ? (
									<div className="flex flex-center wh_50">
										<Spinner />
									</div>
								) : (
									publishedContent.map((content) => (
										<div
											key={content._id}
											className="l-post"
											data-aos="flip-right"
											data-aos-ease="ease-in-cubic"
											data-aos-duration="2000"
										>
											<div className="l-post-img">
												<Link href={`/blogs/${content.slug}`}>
													<img src={content.images[0] || '/img/no-image.png'} alt={content.title} />
												</Link>

												<div className="tags">
													{content.blogCategory.slice(0, 2).map((cat) => (
														<Link key={cat} href={`blogs/category/${cat}`} className="ai">
															<span />
															{cat.replace(/-/g, ' ')}
														</Link>
													))}
												</div>
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

					{searchInput ? <BlogSearch cls={handleSearchClose} /> : null}
				</section>
			</div>
		</>
	)
}

export default Blogs
