'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { SquarePenIcon, Trash2Icon } from 'lucide-react'

import { IProject } from '@/models/project'
import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading, Pagination } from '@/components/shared'

const ProjectsPage = () => {
	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

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

	return (
		<div className='content-page'>
			<DashboardHeader title='All Published' subtitle='Projects' breadcrumbs={['projects']} />

			<div className='contents-table'>
				<div className='mb-4 flex items-center gap-8'>
					<h2>Search Projects:</h2>

					<input
						type='text'
						placeholder='Search by title...'
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value)
							setCurrentPage(1)
						}}
					/>
				</div>

				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Title</th>
							<th>Edit / Delete</th>
						</tr>
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td colSpan={4}>
									<DataLoading />
								</td>
							</tr>
						) : (
							<>
								{publishedContent.length === 0 ? (
									<tr>
										<td colSpan={4} className='text-center'>
											No Projects Found
										</td>
									</tr>
								) : (
									publishedContent.map((content, index) => (
										<tr key={content._id}>
											<td>{indexOfFirstContent + index + 1}</td>

											<td>
												<div className='content-image-container'>
													<Image
														src={
															content.images && content.images.length > 0
																? content.images[0]
																: '/img/no-image.png'
														}
														alt='image'
														width={200}
														height={100}
														layout='responsive'
														objectFit='cover'
														priority={false}
														quality={100}
													/>
												</div>
											</td>

											<td>
												<h3>{content.title}</h3>
											</td>

											<td>
												<div className='flex items-center justify-center gap-8'>
													<Link href={`/projects/edit/${content._id}`}>
														<button>
															<SquarePenIcon size={15} />
														</button>
													</Link>

													<Link href={`/projects/delete/${content._id}`}>
														<button>
															<Trash2Icon size={15} />
														</button>
													</Link>
												</div>
											</td>
										</tr>
									))
								)}
							</>
						)}
					</tbody>
				</table>

				{/* for pagination */}
				{publishedContent.length > 0 && totalPages > 1 && (
					<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
				)}
			</div>
		</div>
	)
}

export default ProjectsPage
