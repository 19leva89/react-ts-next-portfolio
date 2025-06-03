'use client'

import Head from 'next/head'
import Form from 'next/form'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'

import { IBlog } from '@/models/blog'
import { useFetchData } from '@/hooks/use-fetch-data'
import { BlogSearch, Pagination, Spinner } from '@/components/shared'

// swiper
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const BlogsPage = () => {
	const { theme } = useTheme()

	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [searchInput, setSearchInput] = useState<boolean>(false)

	// fetch content data
	const { allData = [], loading } = useFetchData<IBlog[]>('/api/blogs')

	// handle page change
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// filter all data based on search query
	const filteredContent =
		searchQuery.trim() === ''
			? allData
			: allData?.filter((content) => content.title.toLowerCase().includes(searchQuery.toLowerCase())) || []

	// total pages
	const totalPages = Math.ceil((filteredContent?.length || 0) / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content
	const currentContent = filteredContent?.slice(indexOfFirstContent, indexOfLastContent) || []

	const publishedContent = currentContent?.filter((content) => content.status === 'publish') || []

	const sliderPublishedData = allData?.filter((content) => content.status === 'publish') || []

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

			<div className='content-page'>
				<section className='top-hero'>
					<div className='container m-auto'>
						<div className='top-title'>
							<div className='top-title-cont flex items-center'>
								<h1 data-aos='fade-right'>
									Welcome to <span>Blogs!</span>
								</h1>

								<p data-aos='fade-right'>
									I write about web, mobile development and modern JavaScript frameworks. The best articles,
									links and news related to web and mobile development
								</p>

								<div className='sub-email' data-aos='fade-up'>
									<Form action='' className='flex items-center'>
										<input onClick={handleSearchOpen} type='text' placeholder='Search blogs here...' />

										<button>Search</button>
									</Form>
								</div>
							</div>
						</div>

						<div className='featured'>
							<div className='container m-auto'>
								<div className='border border-[#2a1f81]' />

								<div className='featured-posts'>
									<div className='fe-title flex items-center'>
										<h3 data-aos='fade-up'>Featured Posts:</h3>
									</div>

									<div className='fe-posts flex items-center'>
										<Swiper
											slidesPerView='auto'
											freeMode={true}
											spaceBetween={30}
											modules={[Scrollbar]}
											scrollbar={{ draggable: true }}
											className='imageSwiper'
										>
											{loading ? (
												<div className='flex items-center justify-center'>
													<Spinner />
												</div>
											) : (
												sliderPublishedData.slice(0, 6).map((content) => (
													<SwiperSlide
														key={content._id}
														data-aos='flip-left'
														data-aos-ease='ease-in-cubic'
														data-aos-duration='2000'
													>
														<div key={content._id} className='f-post'>
															<Link href={`/blogs/${content.slug}`}>
																<Image
																	src={
																		content.images && content.images.length > 0
																			? content.images[0]
																			: '/img/no-image.png'
																	}
																	alt={content.title}
																	width={430}
																	height={480}
																	quality={100}
																/>
															</Link>

															<div className='f-post-info'>
																<h2>
																	<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
																</h2>

																<div className='f-post-by flex items-center justify-between'>
																	<div className='flex items-center gap-8'>
																		<Image src='/img/coder-white.png' alt='coder' width={32} height={32} />

																		<p>by Sobolev</p>
																	</div>

																	<div className='tags flex flex-nowrap items-center'>
																		{content.blogCategory?.slice(0, 1).map((cat) => (
																			<Link key={cat} href={`blogs/category/${cat}`} className='ai'>
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

				<section className='popular-tags-sec'>
					<div className='container m-auto'>
						<div className='border border-[#2a1f81]' />

						<div className='popular-tags-data'>
							<div className='fe-title'>
								<h3>Popular Tags:</h3>
							</div>

							<div className='popu-tags'>
								<Link href='/blogs/category/next-js' className='p-tag' data-aos='fade-right'>
									<Image
										src={theme === 'light' ? '/svg/next-js-dark.svg' : '/svg/next-js-white.svg'}
										alt='next-js'
										width={190}
										height={150}
									/>

									<div className='tags'>
										<div className='apps'>
											<span />
											Next JS
										</div>
									</div>
								</Link>

								<Link href='/blogs/category/node-js' className='p-tag' data-aos='fade-right'>
									<Image src='/img/node-js.png' alt='node js' width={190} height={150} />

									<div className='tags'>
										<div className='apps'>
											<span />
											Node JS
										</div>
									</div>
								</Link>

								<Link href='/blogs/category/react-js' className='p-tag' data-aos='fade-right'>
									<Image src='/img/react-js.gif' alt='react js' width={190} height={150} />

									<div className='tags'>
										<div className='apps'>
											<span />
											React JS
										</div>
									</div>
								</Link>

								<Link href='/blogs/category/digital-marketing' className='p-tag' data-aos='fade-left'>
									<Image src='/img/digital-marketing.png' alt='digital marketing' width={190} height={150} />

									<div className='tags'>
										<div className='apps'>
											<span />
											Digital
										</div>
									</div>
								</Link>

								<Link href='/blogs/category/flutter-dev' className='p-tag' data-aos='fade-left'>
									<Image src='/img/flutter-dev.png' alt='flutter dev' width={190} height={150} />

									<div className='tags'>
										<div className='apps'>
											<span />
											Flutter
										</div>
									</div>
								</Link>

								<Link href='/blogs/category/css' className='p-tag' data-aos='fade-left'>
									<Image src='/img/css.png' alt='css' width={190} height={150} />

									<div className='tags'>
										<div className='apps'>
											<span />
											CSS
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className='latest-posts-sec'>
					<div className='container m-auto'>
						<div className='border border-[#2a1f81]' />

						<div className='latest-posts-data'>
							<div className='fe-title'>
								<h3>Latest Articles:</h3>
							</div>

							<div className='latest-posts'>
								{loading ? (
									<div className='flex h-[50vh] w-screen items-center justify-center'>
										<Spinner />
									</div>
								) : (
									publishedContent.map((content) => (
										<div
											key={content._id}
											className='l-post'
											data-aos='flip-right'
											data-aos-ease='ease-in-cubic'
											data-aos-duration='2000'
										>
											<div className='l-post-img'>
												<Link href={`/blogs/${content.slug}`}>
													<Image
														src={
															content.images && content.images.length > 0
																? content.images[0]
																: '/img/no-image.png'
														}
														alt={content.title}
														sizes='(max-width: 768px) 100vw, 420px'
														fill
													/>
												</Link>

												<div className='tags'>
													{content.blogCategory?.slice(0, 2).map((cat) => (
														<Link key={cat} href={`blogs/category/${cat}`} className='ai'>
															<span />
															{cat.replace(/-/g, ' ')}
														</Link>
													))}
												</div>
											</div>

											<div className='l-post-info'>
												<h3>
													<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
												</h3>

												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem. </p>

												<h4 className='flex items-center'>
													<Image src='/img/coder-white.png' alt='author' width={28} height={28} />

													<span>by Sobolev</span>
												</h4>
											</div>
										</div>
									))
								)}
							</div>
						</div>

						{/* for pagination */}
						{publishedContent.length > 0 && totalPages > 1 && (
							<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
						)}
					</div>

					{searchInput ? <BlogSearch cls={handleSearchClose} /> : null}
				</section>
			</div>
		</>
	)
}

export default BlogsPage
