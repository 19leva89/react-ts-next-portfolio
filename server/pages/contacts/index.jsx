import Link from 'next/link'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading, LoginLayout, Pagination } from '@/components'

const Contacts = () => {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch content data
	const { allData, loading } = useFetchData('/api/contacts')

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
	const publishedContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	return (
		<LoginLayout>
			<div className="content-page">
				<DashboardHeader
					title="All Published"
					subtitle="Contacts"
					icon={RiArrowRightDoubleFill}
					breadcrumb="contacts"
				/>

				<div className="contents-table">
					<div className="flex gap-2 mb-1">
						<h2>Search Contacts:</h2>
						<input
							type="text"
							placeholder="Search by name..."
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
											<td colSpan={6} className="text-center">
												No Contacts Found
											</td>
										</tr>
									) : (
										publishedContent.map((content, index) => (
											<tr key={content._id}>
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
													<h3>{content.project[0]}</h3>
												</td>

												<td>
													<div className="flex gap-2 flex-center">
														<Link href={`/contacts/view/${content._id}`}>
															<button>
																<FaRegEye />
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
					{publishedContent.length > 0 && (
						<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
					)}
				</div>
			</div>
		</LoginLayout>
	)
}

export default Contacts
