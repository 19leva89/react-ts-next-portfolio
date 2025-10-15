import { Schema, models, model, Model, Types } from 'mongoose'

export interface IProject {
	_id: Types.ObjectId
	title: string
	slug: string
	designer?: string
	images?: string[]
	description?: string
	client?: string
	livePreview?: string
	projectCategory?: string[]
	tags?: string[]
	status?: string
	createdAt?: Date
}

const projectSchema = new Schema<IProject>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		designer: { type: String },
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

export const Project = (models.Project || model('Project', projectSchema, 'projects')) as Model<IProject>
