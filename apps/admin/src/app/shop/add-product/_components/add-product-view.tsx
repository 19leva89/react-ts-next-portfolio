'use client'

import { Types } from 'mongoose'

import { Shop, DashboardHeader } from '@/components/shared'

export const AddProductView = () => {
	return (
		<div className='add-contents-page'>
			<DashboardHeader title='Add' subtitle='Product' breadcrumbs={['shop', 'add-product']} />

			<div className='contents-add'>
				<Shop _id={new Types.ObjectId()} title='' slug='' />
			</div>
		</div>
	)
}
