import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DraftShopView } from './_components/draft-shop-view'

const DraftShopPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <DraftShopView />
}

export default DraftShopPage
