const { Schema, models, model } = require('mongoose')

const photoSchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true },
	images: [{ type: String, required: true }],
}, {
	timestamps: true,
})

export const Photo = models.Photo || model('Photo', photoSchema, 'photos')