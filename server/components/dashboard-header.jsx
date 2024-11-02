export const DashboardHeader = ({ title, subtitle, icon: IconComponent, breadcrumb }) => {
	return (
		<div className="title-dashboard flex flex-sb">
			<div>
				<h2>
					{title} <span>{subtitle}</span>
				</h2>
				<h3>ADMIN PANEL</h3>
			</div>

			<div className="breadcrumb">
				<IconComponent /> <span>/</span> <span>{breadcrumb}</span>
			</div>
		</div>
	)
}
