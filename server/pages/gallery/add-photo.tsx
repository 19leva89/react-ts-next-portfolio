import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Photo, DashboardHeader, LoginLayout } from '@/components'

const AddPhoto = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Photo" icon={RiArrowRightDoubleFill} breadcrumb="add photo" />

				<div className="contents-add">
					<Photo _id={''} title={''} slug={''} images={[]} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddPhoto
