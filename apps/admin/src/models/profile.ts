import { Schema, models, model, Model } from 'mongoose'

export interface IProfile {
	email: string
	password: string
	createdAt?: Date
}

const profileSchema = new Schema<IProfile>(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	},
)

export const Profile = (models.Profile || model('Profile', profileSchema, 'admin')) as Model<IProfile>
