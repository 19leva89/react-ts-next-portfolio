import { Schema, models, model, Types, Model } from 'mongoose'

export interface IComment {
	_id: Types.ObjectId
	name: string
	email: string
	title?: string
	contentPreview?: string
	mainComment?: boolean
	blog: Types.ObjectId
	parent?: Types.ObjectId
	children?: (Types.ObjectId | IComment)[]
	parentName?: string
	createdAt?: Date
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

export const Comment = (models.Comment || model('Comment', commentSchema, 'comments')) as Model<IComment>
