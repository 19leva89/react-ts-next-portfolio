import { NextApiRequest, NextApiResponse } from 'next'

import { Project } from '@/models/project'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'GET') {
		// fetch a single project by id
		if (req.query?.id) {
			const project = await Project.findById(req.query.id)
			res.json(project)

			// fetch project by category
		} else if (req.query?.projectCategory) {
			const projectCat = await Project.find({ projectCategory: req.query.projectCategory })
			res.json(projectCat)

			// fetch project by slug
		} else if (req.query?.slug) {
			const projectSlug = await Project.find({ slug: req.query.slug })
			res.json(projectSlug.reverse())

			// fetch all projects
		} else {
			const projects = await Project.find()
			res.json(projects.reverse())
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
