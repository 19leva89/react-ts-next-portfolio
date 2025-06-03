import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { Project } from '@/models/project'
import { mongooseConnect } from '@/lib/mongoose'

export async function GET(request: NextRequest) {
	try {
		const session = await auth()

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await mongooseConnect()

		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')

		if (id) {
			const project = await Project.findById(id)
			return NextResponse.json(project)
		} else {
			const projects = await Project.find().sort({ _id: -1 })
			return NextResponse.json(projects)
		}
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await auth()

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await mongooseConnect()

		const body = await request.json()

		const projectDoc = await Project.create({
			title: body.title,
			slug: body.slug,
			designer: body.designer,
			images: body.images,
			description: body.description,
			client: body.client,
			projectCategory: body.projectCategory,
			tags: body.tags,
			livePreview: body.livePreview,
			status: body.status,
		})

		return NextResponse.json(projectDoc, { status: 201 })
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function PUT(request: NextRequest) {
	try {
		const session = await auth()

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await mongooseConnect()

		const body = await request.json()

		await Project.updateOne(
			{ _id: body._id },
			{
				title: body.title,
				slug: body.slug,
				designer: body.designer,
				images: body.images,
				description: body.description,
				client: body.client,
				projectCategory: body.projectCategory,
				tags: body.tags,
				livePreview: body.livePreview,
				status: body.status,
			},
		)

		return NextResponse.json({ success: true })
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const session = await auth()

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await mongooseConnect()

		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')

		if (id) {
			await Project.deleteOne({ _id: id })
			return NextResponse.json({ success: true })
		}

		return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
