import { Schema, models, model, Model, Types } from 'mongoose'

export interface IContact {
	_id: Types.ObjectId
	firstName: string
	lastName?: string
	email: string
	company: string
	phone: string
	country?: string
	price?: string
	description?: string
	project?: string[]
	viewed?: boolean
	createdAt?: Date
}

const contactSchema = new Schema<IContact>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true },
		company: { type: String, required: true },
		phone: { type: String, required: true },
		country: { type: String },
		price: { type: String },
		description: { type: String },
		project: [{ type: String }],
		viewed: { type: Boolean },
	},
	{
		timestamps: true,
	},
)

export const Contact = (models.Contact || model('Contact', contactSchema, 'contacts')) as Model<IContact>
