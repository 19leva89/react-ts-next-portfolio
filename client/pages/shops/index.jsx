import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { Spinner } from '@/components'
import { formatDate } from '@/utils/format-date'
import { useFetchData } from '@/hooks/use-fetch-data'

const Shop = () => {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch content data
	const { allData, loading } = useFetchData('/api/shops')

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

	const publishedData = allData.filter((content) => content.status === 'publish')

	const createdAtData = allData[0]?.createdAt ? new Date(allData[0]?.createdAt) : null

	return (
		<>
			<Head>
				<title>Shop</title>
			</Head>

			<div className="shop-page">
				<div className="shop-page-top-title">
					<div className="container">
						<h2 data-aos="fade-right">Shop Online</h2>

						<h3 data-aos="fade-right">Our Products</h3>
					</div>
				</div>

				<div className="shop-products">
					<div className="container">
						<div className="shop-pro-cards">
							{loading ? (
								<Spinner />
							) : (
								publishedData.map((product) => (
									<Link
										href={`/shops/${product.slug}`}
										key={product._id}
										className="sp-pro-card"
										data-aos="flip-left"
										data-aos-ease="ease-in-cubic"
										data-aos-duration="2000"
									>
										<div className="sp-pro-card-img">
											<img src={product.images[0] || '/img/no-image.png'} alt={product.title} />
										</div>

										<div className="sp-pro-card-info">
											<h2>{product.title}</h2>

											<h3>$ {product.price}</h3>

											<div className="sp-pro-tags">
												{product.tags.map((tag) => (
													<span key={tag}>{tag.replace(/-/g, ' ')}</span>
												))}
											</div>

											<p>{formatDate(createdAtData)}</p>
										</div>
									</Link>
								))
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Shop
