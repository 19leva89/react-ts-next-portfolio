import { NextRequest, NextResponse } from 'next/server'

import { Contact } from '@/models/contact'
import { mongooseConnect } from '@/lib/mongoose'

export async function POST(request: NextRequest) {
	try {
		await mongooseConnect()

		const { firstName, lastName, email, company, phone, country, price, description, project } =
			await request.json()

		const contactDoc = await Contact.create({
			firstName,
			lastName,
			email,
			company,
			phone,
			country,
			price,
			description,
			project,
			viewed: false,
		})

		return NextResponse.json(contactDoc, { status: 201 })
	} catch (error) {
		console.error('[CONTACTS_CREATE] Error creating:', error)
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
	}
}
