import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { GalleryView } from './_components/gallery-view'

const GalleryPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <GalleryView />
}

export default GalleryPage
