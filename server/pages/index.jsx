import axios from 'axios'
import Head from 'next/head'
import { Bar } from 'react-chartjs-2'
import { IoHome } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

import { DashboardHeader, LoginLayout } from '@/components'

const Home = () => {
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

	// use this on top for render error
	const [blogsData, setBlogsData] = useState([])
	const [projectData, setProjectData] = useState([])
	const [shopData, setShopData] = useState([])
	const [photosData, setPhotosData] = useState([])
	const [loading, setLoading] = useState(true)

	// define option within the component scope
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Blogs created Monthly by Year',
			},
		},
	}

	// aggregate data by year and month
	const monthlyData = blogsData
		.filter((item) => item.status === 'publish')
		.reduce((acc, blog) => {
			const year = new Date(blog.createdAt).getFullYear() // get year
			const month = new Date(blog.createdAt).getMonth() // get month
			acc[year] = acc[year] || Array(12).fill(0) // initialize year if not exist
			acc[year][month]++ // increment month if exist
			return acc
		}, {})

	const currentYear = new Date().getFullYear() // get current year
	const years = Object.keys(monthlyData)
	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const datasets = years.map((year) => ({
		label: `${year}`,
		data: monthlyData[year] || Array(12).fill(0), // initialize year if not exist
		backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
	}))

	const data = {
		labels,
		datasets,
	}

	useEffect(() => {
		// fetch blog data from api
		const fetchData = async () => {
			try {
				const resBlog = await axios.get('/api/blogs')
				const resProject = await axios.get('/api/projects')
				const resShop = await axios.get('/api/shops')
				const resGallery = await axios.get('/api/photos')

				const dataBlog = await resBlog.data
				const dataProject = await resProject.data
				const dataShop = await resShop.data
				const dataGallery = await resGallery.data

				setBlogsData(dataBlog)
				setProjectData(dataProject)
				setShopData(dataShop)
				setPhotosData(dataGallery)

				setLoading(false)
			} catch (error) {
				setLoading(false)
				console.error('[PAGES_HOME] Data fetch error:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<LoginLayout>
			<Head>
				<title>Portfolio Backend</title>

				<meta name="description" content="Blog website backend" />

				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<div className="dashboard">
				<DashboardHeader title="Admin" subtitle="Dashboard" icon={IoHome} breadcrumb="dashboard" />

				{/* dashboard four cards */}
				<div className="top-four-cards flex flex-sb">
					<div className="four-card">
						<h2>Total Blogs</h2>
						<span>{blogsData.filter((item) => item.status === 'publish').length}</span>
					</div>

					<div className="four-card">
						<h2>Total Projects</h2>
						<span>{projectData.filter((item) => item.status === 'publish').length}</span>
					</div>

					<div className="four-card">
						<h2>Total Products</h2>
						<span>{shopData.filter((item) => item.status === 'publish').length}</span>
					</div>

					<div className="four-card">
						<h2>Gallery Photos</h2>
						<span>{photosData.length}</span>
					</div>
				</div>

				{/* year overview */}
				<div className="year-overview flex flex-sb">
					<div className="left-year-overview">
						<div className="flex flex-sb">
							<h3>Year Overview</h3>

							<ul className="creative-dots">
								<li className="big-dot"></li>
								<li className="semi-big-dot"></li>
								<li className="medium-dot"></li>
								<li className="semi-medium-dot"></li>
								<li className="small-dot"></li>
								<li className="semi-small-dot"></li>
							</ul>

							<h3 className="text-right">
								{blogsData.filter((item) => item.status === 'publish').length} / 365 <br />{' '}
								<span>Total Published</span>
							</h3>
						</div>

						<Bar data={data} options={options} />
					</div>

					<div className="right-sales-cont">
						<div className="flex flex-sb">
							<h3>Blogs by Category</h3>

							<ul className="creative-dots">
								<li className="big-dot"></li>
								<li className="semi-big-dot"></li>
								<li className="medium-dot"></li>
								<li className="semi-medium-dot"></li>
								<li className="small-dot"></li>
								<li className="semi-small-dot"></li>
							</ul>
						</div>

						<div className="blogs-category flex flex-center">
							<table>
								<thead>
									<tr>
										<td>Category</td>
										<td>Count</td>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td>Node JS</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'node-js').length}</td>
									</tr>

									<tr>
										<td>React JS</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'react-js').length}</td>
									</tr>

									<tr>
										<td>Next JS</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'next-js').length}</td>
									</tr>

									<tr>
										<td>CSS</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'css').length}</td>
									</tr>

									<tr>
										<td>Digital Marketing</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'digital-marketing').length}</td>
									</tr>

									<tr>
										<td>Flutter Dev</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'flutter-dev').length}</td>
									</tr>

									<tr>
										<td>Database</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'database').length}</td>
									</tr>

									<tr>
										<td>Deployment</td>
										<td>{blogsData.filter((item) => item.blogCategory[0] === 'deployment').length}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</LoginLayout>
	)
}

export default Home
