import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { AddProjectView } from './_components/add-project-view'

const AddProjectPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <AddProjectView />
}

export default AddProjectPage
