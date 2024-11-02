const { Schema, models, model } = require('mongoose')

const projectSchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true, },
	images: [{ type: String }],
	description: { type: String },
	client: { type: String },
	livePreview: { type: String },
	projectCategory: [{ type: String }],
	tags: [{ type: String }],
	status: { type: String },
}, {
	timestamps: true,
})

export const Project = models.Project || model('Project', projectSchema, 'projects')