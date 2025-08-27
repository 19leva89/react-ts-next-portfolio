import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { DashboardView } from './_components/dashboard-view'

const DashboardPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <DashboardView />
}

export default DashboardPage
