import { Schema, models, model } from 'mongoose'

interface IShop {
	title: string
	slug: string
	images: string[]
	description: string
	tags: string[]
	affiliateLink: string
	price: number
	status: string
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

export const Shop = models.Shop || model('Shop', productSchema, 'shops')
