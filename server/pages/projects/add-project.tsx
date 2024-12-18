import { Project, DashboardHeader, LoginLayout } from '@/components'

const AddProject = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Project" breadcrumbs={['projects', 'add-project']} />

				<div className="contents-add">
					<Project _id={''} title={''} slug={''} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddProject
