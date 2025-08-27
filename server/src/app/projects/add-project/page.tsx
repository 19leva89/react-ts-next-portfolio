import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Project, DashboardHeader } from '@/components/shared'

const AddProjectPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Project' breadcrumbs={['projects', 'add-project']} />

			<div className='contents-add'>
				<Project _id='' title='' slug='' />
			</div>
		</div>
	)
}

export default AddProjectPage
