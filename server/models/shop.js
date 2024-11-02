const { Schema, models, model } = require('mongoose')

const productSchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true, },
	images: [{ type: String }],
	description: { type: String },
	tags: [{ type: String }],
	affiliateLink: { type: String },
	price: { type: Number },
	status: { type: String },
}, {
	timestamps: true,
})

export const Shop = models.Shop || model('Shop', productSchema, 'shops')