import { NextRequest, NextResponse } from 'next/server'

import { Photo } from '@/models/photo'
import { mongooseConnect } from '@/lib/mongoose'

export async function GET(request: NextRequest) {
	try {
		await mongooseConnect()

		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')

		if (id) {
			const photo = await Photo.findById(id)

			if (photo) {
				return NextResponse.json(photo)
			} else {
				return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
			}
		} else {
			const photos = await Photo.find().sort({ _id: -1 })
			return NextResponse.json(photos)
		}
	} catch {
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
