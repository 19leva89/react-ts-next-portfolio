import { Comment } from "@/models/comment";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		try {
			const { name, email, title, contentPreview, parent } = req.body

			let commentDoc

			if (parent) {
				// if parent comment ID is provided, create a child comment
				commentDoc = await Comment.create({ name, email, title, contentPreview, parent: parent })

				// update parent coment`s children array
				await Comment.findByIdAndUpdate(parent, {
					$push: { children: commentDoc._id }
				})

				// otherwise, create a root comment
			} else {
				commentDoc = await Comment.create({ name, email, title, contentPreview })
			}

			res.status(201).json(commentDoc)
		} catch (error) {
			console.error('[COMMENTS_CREATE] Error creating:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}
