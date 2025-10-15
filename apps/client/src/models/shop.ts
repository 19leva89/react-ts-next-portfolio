import { Schema, models, model, Model, Types } from 'mongoose'

export interface IShop {
	_id: Types.ObjectId
	title: string
	slug: string
	images?: string[]
	description?: string
	tags?: string[]
	affiliateLink?: string
	price?: number
	status?: string
	createdAt?: Date
}

const productSchema = new Schema<IShop>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		images: [{ type: String }],
		description: { type: String },
		tags: [{ type: String }],
		affiliateLink: { type: String },
		price: { type: Number },
		status: { type: String },
	},
	{
		timestamps: true,
	},
)

export const Shop = (models.Shop || model('Shop', productSchema, 'shops')) as Model<IShop>
