import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { Contact } from '@/models/contact'
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
			const contact = await Contact.findById(id)
			return NextResponse.json(contact)
		} else {
			const contacts = await Contact.find().sort({ _id: -1 })
			return NextResponse.json(contacts)
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

		const contactDoc = await Contact.create({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			company: body.company,
			phone: body.phone,
			country: body.country,
			price: body.price,
			description: body.description,
			project: body.project,
			viewed: false,
		})

		return NextResponse.json(contactDoc, { status: 201 })
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

		await Contact.updateOne(
			{ _id: body._id },
			{
				firstName: body.firstName,
				lastName: body.lastName,
				email: body.email,
				company: body.company,
				phone: body.phone,
				country: body.country,
				price: body.price,
				description: body.description,
				project: body.project,
				viewed: body.viewed,
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
			await Contact.deleteOne({ _id: id })
			return NextResponse.json({ success: true })
		} else {
			return NextResponse.json({ error: 'Missing ID parameter' }, { status: 400 })
		}
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
