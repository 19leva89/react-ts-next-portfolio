const { Schema, models, model } = require('mongoose')

const contactSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	email: { type: String, required: true },
	company: { type: String },
	phone: { type: String, required: true },
	country: { type: String },
	price: { type: String },
	description: { type: String },
	project: [{ type: String }],
}, {
	timestamps: true,
})

export const Contact = models.Contact || model('Contact', contactSchema, 'contacts')