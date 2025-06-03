import Link from 'next/link'
import { HouseIcon } from 'lucide-react'

interface DashboardHeaderProps {
	title: string
	subtitle: string
	breadcrumbs?: string[]
}

export const DashboardHeader = ({ title, subtitle, breadcrumbs }: DashboardHeaderProps) => {
	return (
		<div className='title-dashboard flex items-center justify-between'>
			<div>
				<h2>
					{title} <span>{subtitle}</span>
				</h2>
				<h3 className='uppercase'>Admin panel</h3>
			</div>

			<div className='breadcrumb'>
				<Link href='/'>
					<HouseIcon size={22} />
				</Link>

				{breadcrumbs && breadcrumbs.length > 0 && <span>/</span>}

				{breadcrumbs?.map((breadcrumb, index) => (
					<span key={index}>
						{index > 0 && <span>/</span>} {/* Add a slash before each element except the first one */}
						<Link href={`/${breadcrumbs.slice(0, index + 1).join('/')}`}>
							<span>{breadcrumb}</span>
						</Link>
					</span>
				))}
			</div>
		</div>
	)
}
