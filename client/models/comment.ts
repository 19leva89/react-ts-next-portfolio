import { Schema, models, model, Types } from 'mongoose'

export interface IComment {
	name: string
	email: string
	title: string
	contentPreview: string
	mainComment: boolean
	createdAt: Date
	blog: Types.ObjectId
	parent: Types.ObjectId
	children: Types.ObjectId[]
	parentName: string
}

const commentSchema = new Schema<IComment>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		title: { type: String },
		contentPreview: { type: String },
		mainComment: { type: Boolean },
		blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
		parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
		children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
		parentName: { type: String },
	},
	{
		timestamps: true,
	},
)

export const Comment = models.Comment || model('Comment', commentSchema, 'comments')
