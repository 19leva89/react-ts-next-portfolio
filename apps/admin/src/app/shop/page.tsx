import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ShopView } from './_components/shop-view'

const ShopPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <ShopView />
}

export default ShopPage
