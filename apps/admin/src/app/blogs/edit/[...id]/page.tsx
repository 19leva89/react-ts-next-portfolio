import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { EditBlogsView } from './_components/edit-blogs-view'

const EditBlogPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Update Blog</title>
			</Head>

			<EditBlogsView />
		</>
	)
}

export default EditBlogPage
