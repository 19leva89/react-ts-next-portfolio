import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DeleteProductView } from './_components/delete-product-view'

const DeleteProductPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Delete Product</title>
			</Head>

			<DeleteProductView />
		</>
	)
}

export default DeleteProductPage
