'use client'

import Link from 'next/link'
import { useState } from 'react'
import { EyeIcon } from 'lucide-react'

import { IContact } from '@/models/contact'
import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading, Pagination } from '@/components/shared'

const ContactsPage = () => {
	// pagination
	const [perPage] = useState<number>(7)
	const [currentPage, setCurrentPage] = useState<number>(1)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')

	// fetch content data
	const { allData, loading } = useFetchData<IContact[]>('/api/contacts')

	// handle page change
	const paginate = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// filter all data based on search query
	const filteredContent =
		searchQuery.trim() === ''
			? allData
			: allData?.filter((content) => content.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
				[]

	// total pages
	const totalPages = Math.ceil((filteredContent?.length || 0) / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content
	const publishedContent = filteredContent?.slice(indexOfFirstContent, indexOfLastContent) || []

	return (
		<div className='content-page'>
			<DashboardHeader title='All Published' subtitle='Contacts' breadcrumbs={['contacts']} />

			<div className='contents-table'>
				<div className='mb-4 flex items-center gap-8'>
					<h2>Search Contacts:</h2>
					<input
						type='text'
						placeholder='Search by name...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>First name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Project</th>
							<th>Open contact</th>
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
										<td colSpan={6} className='text-center'>
											No Contacts Found
										</td>
									</tr>
								) : (
									publishedContent.map((content, index) => (
										<tr key={content._id} className={content.viewed ? '' : 'bg-[#f23434ad]'}>
											<td>{indexOfFirstContent + index + 1}</td>

											<td>
												<h3>{content.firstName}</h3>
											</td>

											<td>
												<h3>{content.email}</h3>
											</td>

											<td>
												<h3>{content.phone}</h3>
											</td>

											<td>
												<h3>{content.project && content.project.length > 0 ? content.project[0] : 'N/A'}</h3>
											</td>

											<td>
												<div className='flex items-center justify-center gap-8'>
													<Link href={`/contacts/view/${content._id}`}>
														<button>
															<EyeIcon size={15} />
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

export default ContactsPage
