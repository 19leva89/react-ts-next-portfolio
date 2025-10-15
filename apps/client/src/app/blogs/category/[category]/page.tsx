'use client'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { IBlog } from '@/models/blog'
import { useFetchData } from '@/hooks/use-fetch-data'
import { Pagination, Spinner } from '@/components/shared'

const BlogCategoryPage = () => {
	const { category } = useParams() as { category: string }

	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

	// fetch content data
	const { allData, loading } = useFetchData<IBlog[]>(`/api/blogs?blogCategory=${category}`)

	// handle page change
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// Filter and sort all data: published content only, sorted by date
	const filteredContent =
		allData
			?.filter((item) => item.status === 'publish')
			?.sort(
				(a, b) =>
					new Date(b.createdAt ?? new Date(0)).getTime() - new Date(a.createdAt ?? new Date(0)).getTime(),
			) || []

	// total pages based on filtered published content
	const totalPages = Math.ceil(filteredContent.length / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content (paginate AFTER filtering)
	const currentContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	// Helper function to format category name
	const formatCategoryName = (categoryName: string) => {
		return categoryName
			? categoryName
					.replace(/-/g, ' ')
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')
			: 'Loading...'
	}

	const formattedCategory = formatCategoryName(category)

	return (
		<>
			<Head>
				<title>Blog category page</title>
			</Head>

			<div className='blog-category'>
				<section className='top-hero'>
					<div className='container m-auto'>
						<div className='top-title'>
							<div className='top-title-cont flex items-center'>
								<h1>
									Category <span>{formattedCategory}</span>
								</h1>
							</div>
						</div>
					</div>
				</section>

				<section className='latest-posts-sec'>
					<div className='container m-auto'>
						<div className='border border-[#2a1f81]' />

						<div className='latest-posts-data'>
							<div className='fe-title'>
								<h3>{formattedCategory !== 'Loading...' ? `${formattedCategory} articles` : 'Loading...'}</h3>
							</div>

							<div className='latest-posts'>
								{loading ? (
									<div className='flex h-[50vh] w-screen items-center justify-center'>
										<Spinner />
									</div>
								) : (
									<>
										{currentContent.length === 0 ? (
											<div className='flex h-[30vh] w-full items-center justify-center'>
												<p className='text-lg text-gray-500'>No published articles found in this category.</p>
											</div>
										) : (
											currentContent.map((content) => (
												<div key={content._id.toString()} className='l-post'>
													<div className='l-post-img'>
														<Link href={`/blogs/${content.slug}`}>
															<Image
																fill
																src={content.images?.[0] || '/img/no-image.png'}
																alt={content.title ? `${content.title} image` : 'Blog image'}
																sizes='(max-width: 768px) 100vw, 420px'
															/>
														</Link>

														<div className='absolute bottom-2 left-2 z-10 w-full'>
															<Swiper
																slidesPerView='auto'
																spaceBetween={0}
																freeMode={true}
																grabCursor={true}
																modules={[FreeMode]}
																className='tagsSwiper'
															>
																{content.blogCategory?.map((cat, index) => (
																	<SwiperSlide key={index}>
																		<Link href={`/blogs/category/${cat}`} className='ai'>
																			<span />
																			{cat.replace(/-/g, ' ')}
																		</Link>
																	</SwiperSlide>
																))}
															</Swiper>
														</div>
													</div>

													<div className='l-post-info'>
														<h3>
															<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
														</h3>

														<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, autem.</p>

														<h4 className='flex items-center'>
															<Image src='/img/coder-white.png' alt='author' width={28} height={28} />
															<span>by Sobolev</span>
														</h4>
													</div>
												</div>
											))
										)}
									</>
								)}
							</div>
						</div>

						{/* for pagination */}
						{filteredContent.length > 0 && totalPages > 1 && (
							<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
						)}
					</div>
				</section>
			</div>
		</>
	)
}

export default BlogCategoryPage
