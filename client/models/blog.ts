import { Schema, models, model } from 'mongoose'

import { IComment } from '@/models/comment'

interface IBlog {
	title: string
	slug: string
	images: string[]
	description: string
	blogCategory: string[]
	tags: string[]
	status: string
	comments: IComment[]
}

const blogSchema = new Schema<IBlog>(
	{
		title: { type: String, required: true },
		slug: { type: String, required: true },
		images: [{ type: String }],
		description: { type: String },
		blogCategory: [{ type: String }],
		tags: [{ type: String }],
		status: { type: String },
		comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
	{
		timestamps: true,
	},
)

export const Blog = models.Blog || model('Blog', blogSchema, 'blogs')
