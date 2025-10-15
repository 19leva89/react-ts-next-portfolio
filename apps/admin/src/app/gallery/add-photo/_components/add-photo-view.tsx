'use client'

import { Types } from 'mongoose'

import { Photo, DashboardHeader } from '@/components/shared'

export const AddPhotoView = () => {
	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Photo' breadcrumbs={['gallery', 'add-photo']} />

			<div className='contents-add'>
				<Photo _id={new Types.ObjectId()} title='' slug='' images={[]} />
			</div>
		</div>
	)
}
