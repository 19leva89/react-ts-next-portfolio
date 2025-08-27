import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { AddProductView } from './_components/add-product-view'

const AddProductPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <AddProductView />
}

export default AddProductPage
