import { Schema, models, model, Model, Types } from 'mongoose'

export interface IPhoto {
	_id: Types.ObjectId
	title: string
	slug: string
	images: string[]
	createdAt?: Date
}

const photoSchema = new Schema<IPhoto>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		images: [{ type: String, required: true }],
	},
	{
		timestamps: true,
	},
)

export const Photo = (models.Photo || model('Photo', photoSchema, 'photos')) as Model<IPhoto>
