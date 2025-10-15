'use client'

import { Types } from 'mongoose'

import { Blog, DashboardHeader } from '@/components/shared'

export const AddBlogView = () => {
	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Blog' breadcrumbs={['blogs', 'add-blog']} />

			<div className='contents-add'>
				<Blog _id={new Types.ObjectId()} title='' slug='' />
			</div>
		</div>
	)
}
