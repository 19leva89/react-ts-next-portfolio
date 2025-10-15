import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DeleteBlogView } from './_components/delete-blog-view'

const DeleteBlogPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Delete Blog</title>
			</Head>

			<DeleteBlogView />
		</>
	)
}

export default DeleteBlogPage
