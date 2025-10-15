import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DraftProjectsView } from './_components/draft-projects-view'

const DraftProjectsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <DraftProjectsView />
}

export default DraftProjectsPage
