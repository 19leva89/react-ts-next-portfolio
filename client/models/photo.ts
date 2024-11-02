import { Schema, models, model } from 'mongoose'

interface IPhoto {
	title: string
	slug: string
	images: string[]
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

export const Photo = models.Photo || model('Photo', photoSchema, 'photos')
