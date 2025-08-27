import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { BlogsView } from './_components/blogs-view'

const BlogsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <BlogsView />
}

export default BlogsPage
