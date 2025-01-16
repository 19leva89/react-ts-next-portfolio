import Link from 'next/link'
import { IoHome } from 'react-icons/io5'

interface DashboardHeaderProps {
	title: string
	subtitle: string
	breadcrumbs?: string[]
}

export const DashboardHeader = ({ title, subtitle, breadcrumbs }: DashboardHeaderProps) => {
	return (
		<div className="title-dashboard flex flex-sb">
			<div>
				<h2>
					{title} <span>{subtitle}</span>
				</h2>
				<h3>ADMIN PANEL</h3>
			</div>

			<div className="breadcrumb">
				<Link href="/">
					<IoHome />
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
