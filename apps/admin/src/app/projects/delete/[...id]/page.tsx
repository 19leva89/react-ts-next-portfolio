import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DeleteProjectView } from './_components/delete-project-view'

const DeleteProjectPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Delete Project</title>
			</Head>

			<DeleteProjectView />
		</>
	)
}

export default DeleteProjectPage
