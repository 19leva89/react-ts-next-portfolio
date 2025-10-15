import { NextRequest, NextResponse } from 'next/server'

import { Project } from '@/models/project'
import { mongooseConnect } from '@/lib/mongoose'

export async function GET(request: NextRequest) {
	try {
		await mongooseConnect()

		const { searchParams } = new URL(request.url)

		const id = searchParams.get('id')
		const projectCategory = searchParams.get('projectCategory')
		const slug = searchParams.get('slug')

		if (id) {
			// Fetch a single project by ID
			const project = await Project.findById(id)
			if (!project) {
				return NextResponse.json({ message: 'Project not found' }, { status: 404 })
			}
			return NextResponse.json(project)

			// Fetch project by category
		} else if (projectCategory) {
			const projectCat = await Project.find({ projectCategory })
			return NextResponse.json(projectCat)

			// Fetch project by slug
		} else if (slug) {
			const projectSlug = await Project.find({ slug }).sort({ _id: -1 })
			return NextResponse.json(projectSlug)

			// Fetch all projects
		} else {
			const projects = await Project.find().sort({ _id: -1 })
			return NextResponse.json(projects)
		}
	} catch (error) {
		console.error('[PROJECTS] Data fetch error:', error)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
