import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components'
import { IProject } from '@/models/project'
import { useFetchData } from '@/hooks/use-fetch-data'

import { GoArrowUpRight } from 'react-icons/go'

const Projects = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('all')
	const [filtredProjects, setFiltredProjects] = useState<IProject[]>([])

	// pagination
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')

	// fetch content data
	const { allData, loading } = useFetchData<IProject[]>('/api/projects')

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

	const publishedData = allData?.filter((content) => content.status === 'publish') || []

	useEffect(() => {
		// filter projects based on selected category
		if (selectedCategory === 'all') {
			setFiltredProjects((allData ?? []).filter((project) => project.status === 'publish'))
		} else {
			setFiltredProjects(
				(allData ?? []).filter(
					(project) => project.status === 'publish' && project.projectCategory?.[0] === selectedCategory,
				),
			)
		}
	}, [selectedCategory, allData])

	return (
		<>
			<Head>
				<title>Project</title>
			</Head>

			<div className="project-page">
				<div className="projects">
					<div className="container">
						<div className="projects-title">
							<h2 data-aos="fade-up">My Recent Works</h2>

							<p data-aos="fade-up">
								I put your ideas and thus your wishes in the form of a unique web project that inspires you
								and you customers
							</p>
						</div>

						<div
							className="projects-button"
							data-aos="fade-zoom-in"
							data-aos-ease="ease-in-back"
							data-aos-offset="0"
							data-aos-delay="300"
						>
							<button
								className={selectedCategory === 'all' ? 'active' : ''}
								onClick={() => setSelectedCategory('all')}
							>
								All
							</button>

							<button
								className={selectedCategory === 'website-development' ? 'active' : ''}
								onClick={() => setSelectedCategory('website-development')}
							>
								Website
							</button>

							<button
								className={selectedCategory === 'app-development' ? 'active' : ''}
								onClick={() => setSelectedCategory('app-development')}
							>
								Apps
							</button>

							<button
								className={selectedCategory === 'design-system' ? 'active' : ''}
								onClick={() => setSelectedCategory('design-system')}
							>
								Design
							</button>

							<button
								className={selectedCategory === 'website-migration' ? 'active' : ''}
								onClick={() => setSelectedCategory('website-migration')}
							>
								Migration
							</button>

							<button
								className={selectedCategory === 'e-commerce-site' ? 'active' : ''}
								onClick={() => setSelectedCategory('e-commerce-site')}
							>
								E-commerce
							</button>

							<button
								className={selectedCategory === 'performance-evaluation' ? 'active' : ''}
								onClick={() => setSelectedCategory('performance-evaluation')}
							>
								Performance
							</button>
						</div>

						<div className="projects-card">
							{loading ? (
								<div className="flex flex-center wh_50">
									<Spinner />
								</div>
							) : (
								<>
									{filtredProjects.length === 0 ? (
										<h1 className="flex flex-center w-100 mt-3">No projects found</h1>
									) : (
										filtredProjects.map((project) => (
											<Link
												key={project._id}
												href={`/projects/${project.slug}`}
												className="pro-card"
												data-aos="flip-left"
												data-aos-ease="ease-in-cubic"
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
													<h2>{project.title}</h2>

													<GoArrowUpRight />
												</div>
											</Link>
										))
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Projects
