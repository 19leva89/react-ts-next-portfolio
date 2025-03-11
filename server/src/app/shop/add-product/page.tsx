import { Shop, DashboardHeader, LoginLayout } from '@/components/shared'

const AddProductPage = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Product" breadcrumbs={['shop', 'add-product']} />

				<div className="contents-add">
					<Shop _id={''} title={''} slug={''} />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddProductPage
