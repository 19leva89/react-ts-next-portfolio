import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Blog, DashboardHeader } from '@/components/shared'

const AddBlogPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/sign-in')
	}

	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Blog' breadcrumbs={['blogs', 'add-blog']} />

			<div className='contents-add'>
				<Blog _id='' title='' slug='' />
			</div>
		</div>
	)
}

export default AddBlogPage
