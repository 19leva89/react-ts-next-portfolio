import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DeleteContactView } from './_components/delete-contact-view'

const DeleteContactPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Delete Contact</title>
			</Head>

			<DeleteContactView />
		</>
	)
}

export default DeleteContactPage
