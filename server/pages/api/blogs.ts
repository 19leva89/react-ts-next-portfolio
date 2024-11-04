import { NextApiRequest, NextApiResponse } from 'next'

import { Blog } from '@/models/blog'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		const { title, slug, images, description, blogCategory, tags, status } = req.body

		const blogDoc = await Blog.create({
			title,
			slug,
			images,
			description,
			blogCategory,
			tags,
			status,
		})

		res.json(blogDoc)
	}

	if (method === 'GET') {
		if (req.query.id) {
			const blog = await Blog.findById(req.query.id)

			res.json(blog)
		} else {
			const blogs = await Blog.find()

			res.json(blogs.reverse())
		}
	}

	if (method === 'PUT') {
		const { _id, title, slug, images, description, blogCategory, tags, status } = req.body

		await Blog.updateOne(
			{ _id },
			{
				title,
				slug,
				images,
				description,
				blogCategory,
				tags,
				status,
			},
		)

		res.json(true)
	}

	if (method === 'DELETE') {
		if (req.query.id) {
			await Blog.deleteOne({ _id: req.query.id })

			res.json(true)
		}
	}
}
