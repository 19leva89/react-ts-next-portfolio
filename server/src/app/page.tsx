import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import DashboardPage from './dashboard/page'

// The page must be rendered on the server side
export const dynamic = 'force-dynamic'

const HomePage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <DashboardPage />
}

export default HomePage
