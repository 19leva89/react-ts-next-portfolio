import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { Shop } from '@/models/shop'
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
			const product = await Shop.findById(id)
			return NextResponse.json(product)
		} else {
			const products = await Shop.find().sort({ _id: -1 })
			return NextResponse.json(products)
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

		const productDoc = await Shop.create({
			title: body.title,
			slug: body.slug,
			images: body.images,
			description: body.description,
			tags: body.tags,
			affiliateLink: body.affiliateLink,
			price: body.price,
			status: body.status,
		})

		return NextResponse.json(productDoc, { status: 201 })
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

		await Shop.updateOne(
			{ _id: body._id },
			{
				title: body.title,
				slug: body.slug,
				images: body.images,
				description: body.description,
				tags: body.tags,
				affiliateLink: body.affiliateLink,
				price: body.price,
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
			await Shop.deleteOne({ _id: id })
			return NextResponse.json({ success: true })
		}

		return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
