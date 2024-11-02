import { Schema, models, model } from 'mongoose'

interface IProject {
	title: string
	slug: string
	images: string[]
	description: string
	client: string
	livePreview: string
	projectCategory: string[]
	tags: string[]
	status: string
}

const projectSchema = new Schema<IProject>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		images: [{ type: String }],
		description: { type: String },
		client: { type: String },
		livePreview: { type: String },
		projectCategory: [{ type: String }],
		tags: [{ type: String }],
		status: { type: String },
	},
	{
		timestamps: true,
	},
)

export const Project = models.Project || model('Project', projectSchema, 'projects')
