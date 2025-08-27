import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { AddBlogView } from './_components/add-blog-view'

const AddBlogPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <AddBlogView />
}

export default AddBlogPage
