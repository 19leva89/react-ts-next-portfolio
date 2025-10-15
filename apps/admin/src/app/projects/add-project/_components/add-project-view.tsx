'use client'

import { Types } from 'mongoose'

import { Project, DashboardHeader } from '@/components/shared'

export const AddProjectView = () => {
	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Project' breadcrumbs={['projects', 'add-project']} />

			<div className='contents-add'>
				<Project _id={new Types.ObjectId()} title='' slug='' />
			</div>
		</div>
	)
}
