import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DeletePhotoView } from './_components/delete-photo-view'

const DeletePhotoPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Delete Photo</title>
			</Head>

			<DeletePhotoView />
		</>
	)
}

export default DeletePhotoPage
