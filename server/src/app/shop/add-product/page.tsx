import { Shop, DashboardHeader } from '@/components/shared'

const AddProductPage = () => {
	return (
		<div className="add-contents-page">
			<DashboardHeader title="Add" subtitle="Product" breadcrumbs={['shop', 'add-product']} />

			<div className="contents-add">
				<Shop _id={''} title={''} slug={''} />
			</div>
		</div>
	)
}

export default AddProductPage
