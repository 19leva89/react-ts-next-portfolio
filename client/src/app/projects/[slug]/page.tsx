'use client'

import Head from 'next/head'
import Image from 'next/image'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

import { useParams } from 'next/navigation'

import { IProject } from '@/models/project'
import { formatDate } from '@/utils/format-date'
import { CodeBlock, Spinner } from '@/components/shared'
import { useFetchData } from '@/hooks/use-fetch-data'

// swiper
import 'swiper/css'
import 'swiper/css/scrollbar'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const ProjectSlugPage = () => {
	const { slug } = useParams() as { slug: string }
	const { allData, loading } = useFetchData<IProject[]>(`/api/projects?slug=${slug}`)

	const projectCategory = allData?.[0].projectCategory
		?.map((category) => category.replace(/-/g, ' '))
		.join(', ')

	const createdAtData = allData?.[0].createdAt ? new Date(allData[0]?.createdAt) : null

	return (
		<>
			<Head>
				<title>{slug ? slug.replace(/-/g, ' ') : 'Loading...'}</title>
			</Head>

			<div className="project-slug">
				<div className="project-slug-img">
					<div className="container m-auto">
						<div className="pro-slug-img">
							{loading ? (
								<div className="w-full h-full flex items-center justify-center">
									<Spinner />
								</div>
							) : (
								<Image
									src={allData?.[0].images?.[0] || '/img/no-image.png'}
									alt={allData && allData[0] ? allData[0].title : ''}
									width={1300}
									height={700}
									quality={100}
								/>
							)}
						</div>

						<div className="project-slug-info">
							<div className="left-main-pro-info">
								<h1>{projectCategory}</h1>

								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsa, voluptatum quae eos quam
									dolore animi repellendus consequatur unde voluptates minima consectetur beatae ratione
									quidem sapiente quia similique. Consequatur, omnis?
								</p>

								<a href={allData?.[0].livePreview} target="_blank">
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

									<h2>{allData?.[0].client}</h2>
								</div>

								<div>
									<h3>Start Date</h3>

									<h2>{formatDate(createdAtData)}</h2>
								</div>

								<div>
									<h3>Designer</h3>

									<h2>{allData?.[0].designer}</h2>
								</div>
							</div>
						</div>

						<div className="project-slug-slider-img">
							<Swiper
								slidesPerView={'auto'}
								spaceBetween={30}
								freeMode={true}
								grabCursor={true}
								modules={[Scrollbar]}
								scrollbar={{ draggable: true }}
								className="imageSwiper"
							>
								{allData?.[0].images?.map((image, index) => (
									<SwiperSlide key={index}>
										<Image src={image} alt={allData[0].title} width={350} height={230} quality={100} />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>

				<div className="project-slug-description">
					<div className="container m-auto">
						<div className="ps-desc">
							<h2>Project Description</h2>

							<div className="blog-content">
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
		</>
	)
}

export default ProjectSlugPage
