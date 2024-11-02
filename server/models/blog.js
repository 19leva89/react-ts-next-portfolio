const { Schema, models, model } = require('mongoose')

const blogSchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true, },
	images: [{ type: String }],
	description: { type: String },
	blogCategory: [{ type: String }],
	tags: [{ type: String }],
	status: { type: String },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', }],
}, {
	timestamps: true,
})

export const Blog = models.Blog || model('Blog', blogSchema, 'blogs')