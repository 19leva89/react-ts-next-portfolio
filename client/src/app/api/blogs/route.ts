import { NextRequest, NextResponse } from 'next/server'

import { Blog } from '@/models/blog'
import { mongooseConnect } from '@/lib/mongoose'

export async function GET(request: NextRequest) {
	try {
		await mongooseConnect()

		const { searchParams } = new URL(request.url)

		const id = searchParams.get('id')
		const tags = searchParams.get('tags')
		const blogCategory = searchParams.get('blogCategory')
		const slug = searchParams.get('slug')

		if (id) {
			// Fetch a single blog by ID
			const blog = await Blog.findById(id)
			if (!blog) {
				return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
			}
			return NextResponse.json(blog)

			// Fetch blog by tags
		} else if (tags) {
			const blogTags = await Blog.find({ tags })
			return NextResponse.json(blogTags)

			// Fetch blog by category
		} else if (blogCategory) {
			const blogCat = await Blog.find({ blogCategory })
			return NextResponse.json(blogCat)

			// Fetch blog by slug
		} else if (slug) {
			const blogSlug = await Blog.find({ slug }).sort({ _id: -1 })
			return NextResponse.json(blogSlug)

			// Fetch all blogs
		} else {
			const blogs = await Blog.find().sort({ _id: -1 })
			return NextResponse.json(blogs)
		}
	} catch (error) {
		console.error('[BLOGS] Data fetch error:', error)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
