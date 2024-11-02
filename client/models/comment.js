const { Schema, models, model } = require('mongoose')

const commentSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, },
	title: { type: String },
	contentPreview: { type: String },
	mainComment: { type: Boolean },
	createdAt: { type: Date, default: Date.now },
	blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
	parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
	children: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	parentName: { type: String },

})

export const Comment = models.Comment || model('Comment', commentSchema, 'comments')