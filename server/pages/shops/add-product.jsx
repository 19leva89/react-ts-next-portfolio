import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Shop, DashboardHeader, LoginLayout } from '@/components'

const AddProduct = () => {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader
					title="Add"
					subtitle="Product"
					icon={RiArrowRightDoubleFill}
					breadcrumb="add product"
				/>

				<div className="contents-add">
					<Shop />
				</div>
			</div>
		</LoginLayout>
	)
}

export default AddProduct
