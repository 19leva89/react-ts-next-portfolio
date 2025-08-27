import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DraftBlogsView } from './_components/draft-blogs-view'

const DraftBlogsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <DraftBlogsView />
}

export default DraftBlogsPage
