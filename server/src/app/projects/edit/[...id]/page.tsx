import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { EditProjectView } from './_components/edit-project-view'

const EditProjectPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Update Project</title>
			</Head>

			<EditProjectView />
		</>
	)
}

export default EditProjectPage
