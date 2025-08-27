import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { SettingsView } from './_components/settings-view'

const SettingsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <SettingsView />
}

export default SettingsPage
