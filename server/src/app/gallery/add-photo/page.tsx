import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Photo, DashboardHeader } from '@/components/shared'

const AddPhotoPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Photo' breadcrumbs={['gallery', 'add-photo']} />

			<div className='contents-add'>
				<Photo _id='' title='' slug='' images={[]} />
			</div>
		</div>
	)
}

export default AddPhotoPage
