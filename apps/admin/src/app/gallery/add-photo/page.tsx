import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { AddPhotoView } from './_components/add-photo-view'

const AddPhotoPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <AddPhotoView />
}

export default AddPhotoPage
