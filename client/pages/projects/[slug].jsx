import Head from 'next/head'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'

import { CodeBlock } from '@/lib/code-block'
import { formatDate } from '@/utils/format-date'
import { useFetchData } from '@/hooks/use-fetch-data'

const ProjectSlug = () => {
	const router = useRouter()

	const { slug } = router.query
	const { allData, loading } = useFetchData(`/api/projects?slug=${slug}`)

	const projectCategory = allData[0]?.projectCategory
		.map((category) => category.replace(/-/g, ' '))
		.join(', ')

	const createdAtData = allData[0]?.createdAt ? new Date(allData[0]?.createdAt) : null

	return (
		<>
			<Head>
				<title>{slug ? slug.replace(/-/g, ' ') : 'Loading...'}</title>
			</Head>

			<div className="project-slug">
				<div className="project-slug-img">
					<div className="container">
						<div className="pro-slug-img">
							<img src={allData[0]?.images[0]} alt={allData[0]?.title} />
						</div>

						<div className="project-slug-info">
							<div className="left-main-pro-info">
								<h1>{projectCategory}</h1>

								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa, voluptatum quae eos quam
									dolore animi repellendus consequatur unde voluptates minima consectetur beatae ratione
									quidem sapiente quia similique. Consequatur, omnis?
								</p>

								<a href={allData[0]?.livePreview} target="_blank">
									Live Preview
								</a>
							</div>

							<div className="right-main-pro-info">
								<div>
									<h3>Category</h3>

									<h2>{projectCategory}</h2>
								</div>

								<div>
									<h3>Client</h3>

									<h2>{allData[0]?.client}</h2>
								</div>

								<div>
									<h3>Start Date</h3>

									<h2>{formatDate(createdAtData)}</h2>
								</div>

								<div>
									<h3>Designer</h3>

									<h2>Shin Malpur</h2>
								</div>
							</div>
						</div>

						<div className="project-slug-slider-img">
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
										<img src={image} alt={allData[0]?.title} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>

				<div className="project-slug-description">
					<div className="container">
						<div className="ps-desc">
							<h2>Project Description</h2>

							<div className="blog-content">
								<ReactMarkdown remarkPlugins={[remarkGfm]} components={{ code: CodeBlock }}>
									{allData[0]?.description}
								</ReactMarkdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectSlug
