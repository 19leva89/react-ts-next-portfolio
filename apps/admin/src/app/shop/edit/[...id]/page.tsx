import Head from 'next/head'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { EditProductView } from './_components/edit-product-view'

const EditProductPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<>
			<Head>
				<title>Update Product</title>
			</Head>

			<EditProductView />
		</>
	)
}

export default EditProductPage
