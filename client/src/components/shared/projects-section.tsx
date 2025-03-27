'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowUpRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { IProject } from '@/models/project'
import { Spinner } from '@/components/shared'
import { useFetchData } from '@/hooks/use-fetch-data'

interface Props {
	showAllProjects: boolean
	maxProjects?: number
}

export const ProjectsSection = ({ showAllProjects, maxProjects }: Props) => {
	const [filteredProjects, setFilteredProjects] = useState<IProject[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('all')

	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')

	// handle page change
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// fetch content data
	const { allData, loading } = useFetchData<IProject[]>('/api/projects')

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

	const publishedData = allData?.filter((content) => content.status === 'publish') || []

	const buttonClasses = cn(
		'inline-flex items-center text-sm sm:text-lg leading-none font-bold h-8 sm:h-12 p-2 sm:px-8 sm:py-4 border-none rounded-3xl',
		'bg-[var(--week-white)] text-[var(--main-site-color)]',
		'dark:bg-[#140c1c] dark:text-[var(--pure-white)]',
		'hover:bg-gradient-to-r hover:from-[var(--main-site-color)] hover:to-[var(--dark-site-secondary)] hover:text-[var(--pure-white)]',
		'transition-all duration-300',
	)

	const activeClasses = cn(
		'bg-gradient-to-r from-[var(--main-site-color)] to-[#2a1454] text-[var(--pure-white)]',
		'dark:bg-gradient-to-r dark:from-[var(--main-site-color)] dark:to-[#2a1454] dark:text-[var(--pure-white)]',
	)

	useEffect(() => {
		// filter projects based on selected category
		if (selectedCategory === 'all') {
			setFilteredProjects((allData ?? []).filter((project) => project.status === 'publish'))
		} else {
			setFilteredProjects(
				(allData ?? []).filter(
					(project) => project.status === 'publish' && project.projectCategory?.[0] === selectedCategory,
				),
			)
		}
	}, [selectedCategory, allData])

	return (
		<section className="projects">
			<div className="container m-auto">
				<div className="relative text-center mb-12 mt-0 sm:mt-20 max-w-[700px] w-full mx-auto">
					<h2
						className="inline-flex gap-4 mb-0 text-4xl sm:text-5xl bg-gradient-to-r from-[var(--main-site-color)] to-[var(--dark-site-secondary)] dark:to-[#dddddd] bg-clip-text text-transparent"
						data-aos="fade-up"
					>
						My Recent Works
					</h2>

					<p
						className="mt-4 text-sm sm:text-xl text-center text-[var(--dark-black)] dark:text-[#999]"
						data-aos="fade-up"
					>
						I put your ideas and thus your wishes in the form of a unique web project that inspires you and
						your customers
					</p>
				</div>

				<div
					className="flex flex-wrap items-center justify-center gap-4"
					data-aos="fade-zoom-in"
					data-aos-easing="ease-in-back"
					data-aos-delay="300"
					data-aos-offset="0"
				>
					<button
						onClick={() => setSelectedCategory('all')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'all' })}
					>
						All
					</button>

					<button
						onClick={() => setSelectedCategory('website-development')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'website-development' })}
					>
						Website
					</button>

					<button
						onClick={() => setSelectedCategory('app-development')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'app-development' })}
					>
						Apps
					</button>

					<button
						onClick={() => setSelectedCategory('design-system')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'design-system' })}
					>
						Design
					</button>

					<button
						onClick={() => setSelectedCategory('website-migration')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'website-migration' })}
					>
						Migration
					</button>

					<button
						onClick={() => setSelectedCategory('e-commerce-site')}
						className={cn(buttonClasses, { [activeClasses]: selectedCategory === 'e-commerce-site' })}
					>
						E-commerce
					</button>

					<button
						onClick={() => setSelectedCategory('performance-evaluation')}
						className={cn(buttonClasses, {
							[activeClasses]: selectedCategory === 'performance-evaluation',
						})}
					>
						Performance
					</button>
				</div>

				<div className="projects-card">
					{loading ? (
						<div className="flex items-center justify-center w-screen h-[50vh]">
							<Spinner />
						</div>
					) : (
						<>
							{filteredProjects.length === 0 ? (
								<h1 className="flex items-center justify-center w-full h-[25vh] mt-12 text-[var(--dark-black)] dark:text-[#999]">
									No projects found
								</h1>
							) : (
								filteredProjects.slice(0, showAllProjects ? undefined : maxProjects).map((project) => (
									<Link
										key={project._id}
										href={`/projects/${project.slug}`}
										className="pro-card"
										data-aos="flip-left"
										data-aos-easing="ease-out-cubic"
										data-aos-duration="2000"
									>
										<div className="pro-img-box">
											<Image
												src={
													project.images && project.images.length > 0
														? project.images[0]
														: '/img/no-image.png'
												}
												alt={project.title}
												width={550}
												height={400}
												quality={100}
											/>
										</div>

										<div className="pro-content-box">
											<h2 className="mb-0 xl:mb-4 text-sm lg:text-lg xl:text-2xl uppercase">
												{project.title}
											</h2>

											<ArrowUpRightIcon size={35} />
										</div>
									</Link>
								))
							)}
						</>
					)}
				</div>

				{!showAllProjects && (
					<div className="flex items-center justify-center">
						<button className={cn(buttonClasses, 'mt-12 px-8 py-4 h-12 text-lg')}>
							<Link href="/projects">View all projects</Link>
						</button>
					</div>
				)}
			</div>
		</section>
	)
}
