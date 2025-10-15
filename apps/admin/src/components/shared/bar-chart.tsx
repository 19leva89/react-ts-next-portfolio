import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
	ChartDataset,
	ChartData,
} from 'chart.js'

import { IBlog } from '@/models/blog'
import { IShop } from '@/models/shop'
import { IProject } from '@/models/project'

interface BarChartProps {
	shopData: IShop[]
	blogsData: IBlog[]
	projectData: IProject[]
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// define option within the component scope
const options: ChartOptions<'bar'> = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Yearly data overview',
		},
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
}

export const BarChart = ({ shopData, blogsData, projectData }: BarChartProps) => {
	// aggregate data by year and month
	const createMonthlyData = (items: { createdAt?: Date | string; status?: string }[]) => {
		return items
			.filter((item) => item.status === 'publish')
			.reduce<Record<number, number[]>>((acc, item) => {
				const createdAtDate =
					item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt as string)

				if (!isNaN(createdAtDate.getTime())) {
					const year = createdAtDate.getFullYear()
					const month = createdAtDate.getMonth()

					if (year !== undefined && month !== undefined) {
						const months = acc[year] || Array(12).fill(0)

						months[month]++
						acc[year] = months
					}
				}

				return acc
			}, {})
	}

	const shopMonthlyData = createMonthlyData(shopData)
	const blogMonthlyData = createMonthlyData(blogsData)
	const projectMonthlyData = createMonthlyData(projectData)

	const allYears = Array.from(
		new Set([
			...Object.keys(shopMonthlyData),
			...Object.keys(blogMonthlyData),
			...Object.keys(projectMonthlyData),
		]),
	)

	const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const datasets: ChartDataset<'bar'>[] = [
		{
			label: 'Shop items',
			data: allYears.map((year) => shopMonthlyData[+year]?.reduce((a, b) => a + b, 0) || 0),
			backgroundColor: 'rgba(75, 192, 192, 0.5)',
		},
		{
			label: 'Blogs',
			data: allYears.map((year) => blogMonthlyData[+year]?.reduce((a, b) => a + b, 0) || 0),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Projects',
			data: allYears.map((year) => projectMonthlyData[+year]?.reduce((a, b) => a + b, 0) || 0),
			backgroundColor: 'rgba(54, 162, 235, 0.5)',
		},
	]

	const data: ChartData<'bar'> = {
		labels,
		datasets,
	}

	return <Bar data={data} options={options} />
}
