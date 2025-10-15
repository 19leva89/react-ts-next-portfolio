import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { Blog } from '@/models/blog'
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
			const blog = await Blog.findById(id)
			return NextResponse.json(blog)
		} else {
			const blogs = await Blog.find().sort({ _id: -1 })
			return NextResponse.json(blogs)
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

		const blogDoc = await Blog.create({
			title: body.title,
			slug: body.slug,
			images: body.images,
			description: body.description,
			blogCategory: body.blogCategory,
			tags: body.tags,
			status: body.status,
		})

		return NextResponse.json(blogDoc, { status: 201 })
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

		await Blog.updateOne(
			{ _id: body._id },
			{
				title: body.title,
				slug: body.slug,
				images: body.images,
				description: body.description,
				blogCategory: body.blogCategory,
				tags: body.tags,
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
			await Blog.deleteOne({ _id: id })
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
		}
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
