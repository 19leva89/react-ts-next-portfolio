'use client'

import { Project, DashboardHeader } from '@/components/shared'

export const AddProjectView = () => {
	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Project' breadcrumbs={['projects', 'add-project']} />

			<div className='contents-add'>
				<Project _id='' title='' slug='' />
			</div>
		</div>
	)
}
