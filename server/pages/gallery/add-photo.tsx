import { Photo, DashboardHeader, LoginLayout } from '@/components'

const AddPhoto = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Photo" breadcrumbs={['gallery', 'add-photo']} />

				<div className="contents-add">
					<Photo />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddPhoto
