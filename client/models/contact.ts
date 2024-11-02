import { Schema, models, model } from 'mongoose'

interface IContact {
	firstName: string
	lastName: string
	email: string
	company: string
	phone: string
	country: string
	price: string
	description: string
	project: string[]
}

const contactSchema = new Schema<IContact>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true },
		company: { type: String },
		phone: { type: String, required: true },
		country: { type: String },
		price: { type: String },
		description: { type: String },
		project: [{ type: String }],
	},
	{
		timestamps: true,
	},
)

export const Contact = models.Contact || model('Contact', contactSchema, 'contacts')
