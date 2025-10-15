import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ProjectsView } from './_components/projects-view'

const ProjectsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <ProjectsView />
}

export default ProjectsPage
