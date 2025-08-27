import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ViewContactView } from './_components/view-contact-view'

const ViewContactPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>View Contact</title>
			</Head>

			<ViewContactView />
		</>
	)
}

export default ViewContactPage
