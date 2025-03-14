import { Blog, DashboardHeader } from '@/components/shared'

const AddBlogPage = () => {
	return (
		<div className="add-contents-page">
			<DashboardHeader title="Add" subtitle="Blog" breadcrumbs={['blogs', 'add-blog']} />

			<div className="contents-add">
				<Blog _id={''} title={''} slug={''} />
			</div>
		</div>
	)
}

export default AddBlogPage
