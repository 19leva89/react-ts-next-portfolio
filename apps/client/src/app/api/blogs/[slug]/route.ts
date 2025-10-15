import { NextRequest, NextResponse } from 'next/server'

import { Blog } from '@/models/blog'
import { Comment } from '@/models/comment'
import { mongooseConnect } from '@/lib/mongoose'

interface RouteParams {
	slug: string
}

export async function GET(request: NextRequest, context: { params: Promise<RouteParams> }) {
	try {
		await mongooseConnect()

		const { slug } = await context.params

		const blog = await Blog.findOne({ slug })

		if (!blog) {
			return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
		}

		const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 })

		return NextResponse.json({ blog, comments }, { status: 200 })
	} catch (error) {
		console.error('[BLOGS_SLUG] Data boot error:', error)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}

export async function POST(request: NextRequest, context: { params: Promise<RouteParams> }) {
	try {
		await mongooseConnect()

		const { slug } = await context.params
		const { name, email, title, contentPreview, mainComment, parent } = await request.json()

		const blog = await Blog.findOne({ slug })

		if (!blog) {
			return NextResponse.json({ message: 'Blog not found' }, { status: 404 })
		}

		if (parent) {
			// If this is a child comment, find the parent comment
			const parentComment = await Comment.findById(parent)
			if (!parentComment) {
				return NextResponse.json({ message: 'Parent comment not found' }, { status: 404 })
			}

			// Create a child comment
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

			// Save child comment
			await newComment.save()

			// Update the parent comment by adding the child comment
			if (!parentComment.children) {
				parentComment.children = []
			}

			parentComment.children.push(newComment._id)
			await parentComment.save()

			return NextResponse.json(newComment, { status: 201 })
		} else {
			// If this is a main comment (without a parent), create it directly
			const newComment = new Comment({
				name,
				email,
				title,
				contentPreview,
				mainComment,
				blog: blog._id,
			})

			// Save comment
			await newComment.save()

			return NextResponse.json(newComment, { status: 201 })
		}
	} catch (error) {
		console.error('[BLOGS_SLUG] Data boot error:', error)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
