import { NextRequest, NextResponse } from 'next/server'

import { Comment } from '@/models/comment'
import { mongooseConnect } from '@/lib/mongoose'

export async function POST(request: NextRequest) {
	try {
		await mongooseConnect()

		const { name, email, title, contentPreview, parent } = await request.json()

		let commentDoc

		if (parent) {
			// If parent comment ID is provided, create a child comment
			commentDoc = await Comment.create({ name, email, title, contentPreview, parent })

			// Update parent comment`s children array
			await Comment.findByIdAndUpdate(parent, {
				$push: { children: commentDoc._id },
			})
		} else {
			// Otherwise, create a root comment
			commentDoc = await Comment.create({ name, email, title, contentPreview })
		}

		return NextResponse.json(commentDoc, { status: 201 })
	} catch (error) {
		console.error('[COMMENTS_CREATE] Error creating:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
