import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { Photo } from '@/models/photo'
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
			const photo = await Photo.findById(id)
			return NextResponse.json(photo)
		} else {
			const photos = await Photo.find().sort({ _id: -1 })
			return NextResponse.json(photos)
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

		const photoDoc = await Photo.create({
			title: body.title,
			slug: body.slug,
			images: body.images,
		})

		return NextResponse.json(photoDoc, { status: 201 })
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

		await Photo.updateOne(
			{ _id: body._id },
			{
				title: body.title,
				slug: body.slug,
				images: body.images,
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
			await Photo.deleteOne({ _id: id })
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
		}
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
