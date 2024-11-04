import { NextApiRequest, NextApiResponse } from 'next'

import { Project } from '@/models/project'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		const { title, slug, images, description, client, projectCategory, tags, livePreview, status } = req.body

		const projectDoc = await Project.create({
			title,
			slug,
			images,
			description,
			client,
			projectCategory,
			tags,
			livePreview,
			status,
		})

		res.json(projectDoc)
	}

	if (method === 'GET') {
		if (req.query.id) {
			const project = await Project.findById(req.query.id)

			res.json(project)
		} else {
			const projects = await Project.find()

			res.json(projects.reverse())
		}
	}

	if (method === 'PUT') {
		const { _id, title, slug, images, description, client, projectCategory, tags, livePreview, status } =
			req.body

		await Project.updateOne(
			{ _id },
			{
				title,
				slug,
				images,
				description,
				client,
				projectCategory,
				tags,
				livePreview,
				status,
			},
		)

		res.json(true)
	}

	if (method === 'DELETE') {
		if (req.query.id) {
			await Project.deleteOne({ _id: req.query.id })

			res.json(true)
		}
	}
}
