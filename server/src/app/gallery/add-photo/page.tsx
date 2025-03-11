import { Photo, DashboardHeader, LoginLayout } from '@/components/shared'

const AddPhotoPage = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Photo" breadcrumbs={['gallery', 'add-photo']} />

				<div className="contents-add">
					<Photo _id={''} title={''} slug={''} images={[]} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddPhotoPage
