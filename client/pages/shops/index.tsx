import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import { IShop } from '@/models/shop'
import { Spinner } from '@/components'
import { formatDate } from '@/utils/format-date'
import { useFetchData } from '@/hooks/use-fetch-data'

const Shop = () => {
	// pagination
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState<string>('')

	// fetch content data
	const { allData, loading } = useFetchData<IShop[]>('/api/shops')

	if (!allData || allData.length === 0) {
		return <div>No project found</div>
	}

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
											<Image
												src={product.images[0] || '/img/no-image.png'}
												alt={product.title}
												width={420}
												height={330}
											/>
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
