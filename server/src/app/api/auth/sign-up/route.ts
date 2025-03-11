import { NextRequest, NextResponse } from 'next/server'

import { Profile } from '@/models/profile'
import { mongooseConnect } from '@/lib/mongoose'

export async function POST(request: NextRequest) {
	try {
		await mongooseConnect()

		const { email, password } = await request.json()

		const existingUser = await Profile.findOne({ email })
		if (existingUser) {
			return NextResponse.json({ message: 'User already exists' }, { status: 400 })
		}

		const newUser = await Profile.create({ email, password })

		return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 200 })
	} catch (error) {
		console.error('[SIGN_UP] Error creating:', error)
		return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
	}
}
