import { Blog, DashboardHeader, LoginLayout } from '@/components/shared'

const AddBlogPage = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Blog" breadcrumbs={['blogs', 'add-blog']} />

				<div className="contents-add">
					<Blog _id={''} title={''} slug={''} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddBlogPage
