'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { IBlog } from '@/models/blog'
import { IShop } from '@/models/shop'
import { IPhoto } from '@/models/photo'
import { IProject } from '@/models/project'
import { BarChart, DashboardHeader } from '@/components/shared'

export const DashboardView = () => {
	const [shopData, setShopData] = useState<IShop[]>([])
	const [blogsData, setBlogsData] = useState<IBlog[]>([])
	const [photosData, setPhotosData] = useState<IPhoto[]>([])
	const [projectData, setProjectData] = useState<IProject[]>([])

	const categoryCounts =
		blogsData.length > 0
			? blogsData.reduce(
					(acc, blog) => {
						if (blog.status === 'publish' && blog.blogCategory) {
							blog.blogCategory.forEach((category) => {
								const formattedCategory = category
									.replace(/-/g, ' ') // Replace '-' with spaces
									.replace(/^\w/, (c) => c.toUpperCase()) // Capitalize the first letter

								// Increase the counter for this category
								acc[formattedCategory] = (acc[formattedCategory] || 0) + 1
							})
						}

						return acc
					},
					{} as Record<string, number>,
				)
			: {}

	const filteredCategoryCounts = Object.entries(categoryCounts).filter(([, count]) => count > 0)
	// console.log('filteredCategoryCounts', filteredCategoryCounts)

	useEffect(() => {
		// fetch blog data from api
		const fetchData = async () => {
			try {
				const resShop = await axios.get('/api/shops')
				const resBlog = await axios.get('/api/blogs')
				const resGallery = await axios.get('/api/photos')
				const resProject = await axios.get('/api/projects')

				const dataBlog = await resBlog.data
				const dataShop = await resShop.data
				const dataGallery = await resGallery.data
				const dataProject = await resProject.data

				setShopData(dataShop)
				setBlogsData(dataBlog)
				setPhotosData(dataGallery)
				setProjectData(dataProject)
			} catch (error) {
				console.error('[PAGES_HOME] Data fetch error:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<div className='dashboard'>
			<DashboardHeader title='Admin' subtitle='Dashboard' />

			{/* dashboard four cards */}
			<div className='top-four-cards flex flex-wrap items-center justify-between gap-2'>
				<div className='four-card'>
					<h2>Total Blogs</h2>
					<span>{blogsData.filter((item) => item.status === 'publish').length}</span>
				</div>

				<div className='four-card'>
					<h2>Total Projects</h2>
					<span>{projectData.filter((item) => item.status === 'publish').length}</span>
				</div>

				<div className='four-card'>
					<h2>Total Products</h2>
					<span>{shopData.filter((item) => item.status === 'publish').length}</span>
				</div>

				<div className='four-card'>
					<h2>Gallery Photos</h2>
					<span>{photosData.length}</span>
				</div>
			</div>

			{/* year overview */}
			<div className='year-overview flex items-center justify-between'>
				<div className='left-year-overview'>
					<div className='flex items-center justify-between'>
						<h3>Year Overview</h3>

						<ul className='creative-dots'>
							<li className='big-dot'></li>
							<li className='semi-big-dot'></li>
							<li className='medium-dot'></li>
							<li className='semi-medium-dot'></li>
							<li className='small-dot'></li>
							<li className='semi-small-dot'></li>
						</ul>

						<h3 className='text-right'>
							{shopData.filter((item) => item.status === 'publish').length +
								blogsData.filter((item) => item.status === 'publish').length +
								projectData.filter((item) => item.status === 'publish').length}{' '}
							/ 365
							<br />
							<span>Total Published</span>
						</h3>
					</div>

					<BarChart shopData={shopData} blogsData={blogsData} projectData={projectData} />
				</div>

				<div className='right-sales-cont'>
					<div className='flex items-center justify-between'>
						<h3>Data by Category</h3>

						<ul className='creative-dots'>
							<li className='big-dot'></li>
							<li className='semi-big-dot'></li>
							<li className='medium-dot'></li>
							<li className='semi-medium-dot'></li>
							<li className='small-dot'></li>
							<li className='semi-small-dot'></li>
						</ul>
					</div>

					<div className='blogs-category'>
						<table>
							<thead>
								<tr>
									<td>Category</td>
									<td>Count</td>
								</tr>
							</thead>

							<tbody>
								{filteredCategoryCounts.map(([category, count]) => (
									<tr key={category}>
										<td>{category}</td>
										<td>{count}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
