import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Blog, DashboardHeader, LoginLayout } from '@/components'

const AddBlog = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Blog" icon={RiArrowRightDoubleFill} breadcrumb="add blog" />

				<div className="contents-add">
					<Blog _id={''} title={''} slug={''} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddBlog
