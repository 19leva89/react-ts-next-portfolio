import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { EditPhotoView } from './_components/edit-photo-view'

const EditPhotoPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Update Photo</title>
			</Head>

			<EditPhotoView />
		</>
	)
}

export default EditPhotoPage
