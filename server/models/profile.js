const { Schema, models, model } = require('mongoose')

const profileSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true, },

}, {
	timestamps: true,
})

export const Profile = models.Profile || model('Profile', profileSchema, 'admin')