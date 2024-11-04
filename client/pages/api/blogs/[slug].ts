import { NextApiRequest, NextApiResponse } from 'next'

import { Blog } from '@/models/blog'
import { Comment } from '@/models/comment'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query

	await mongooseConnect()

	if (req.method === 'GET') {
		try {
			// fetch blog by slug
			const blog = await Blog.findOne({ slug })

			if (!blog) {
				return res.status(404).json({ message: 'Blog not found' })
			}

			// fetch comments for this blog
			const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 })

			res.status(200).json({ blog, comments })
		} catch (error) {
			console.error('[BLOGS_SLUG] Data boot error:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	} else if (req.method === 'POST') {
		try {
			const { name, email, title, contentPreview, mainComment, parent } = req.body

			const blog = await Blog.findOne({ slug })

			if (!blog) {
				return res.status(404).json({ message: 'Blog not found' })
			}

			if (parent) {
				// if it`s a child comment, find the parent comment
				const parentComment = await Comment.findById(parent)
				if (!parentComment) {
					return res.status(404).json({ message: 'Parent comment not found' })
				}

				// create the child comment
				const newComment = new Comment({
					name,
					email,
					title,
					contentPreview,
					mainComment,
					parent: parentComment._id,
					blog: blog._id,
					parentName: parentComment.name,
				})

				// save the child comment
				await newComment.save()

				// update the parent comment to include the child comment
				parentComment.children.push(newComment._id)

				// save the parent comment
				await parentComment.save()

				res.status(201).json(newComment)

				// if it`s a main comment (no parent), create it directly
			} else {
				const newComment = new Comment({
					name,
					email,
					title,
					contentPreview,
					mainComment,
					blog: blog._id,
				})

				// save the comment
				await newComment.save()

				res.status(201).json(newComment)
			}
		} catch (error) {
			console.error('[BLOGS_SLUG] Data boot error:', error)
			res.status(500).json({ message: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', ['GET', 'POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}