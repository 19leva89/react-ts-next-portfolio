import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ContactsView } from './_components/contacts-view'

const ContactsPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return <ContactsView />
}

export default ContactsPage
