import { NextRequest, NextResponse } from 'next/server'

import { Shop } from '@/models/shop'
import { mongooseConnect } from '@/lib/mongoose'

export async function GET(request: NextRequest) {
	try {
		await mongooseConnect()

		const { searchParams } = new URL(request.url)

		const id = searchParams.get('id')
		const slug = searchParams.get('slug')

		if (id) {
			// Fetch a single shop by ID
			const shop = await Shop.findById(id)
			if (!shop) {
				return NextResponse.json({ message: 'Shop not found' }, { status: 404 })
			}
			return NextResponse.json(shop)

			// Fetch shop by slug
		} else if (slug) {
			const shopSlug = await Shop.find({ slug }).sort({ _id: -1 })
			return NextResponse.json(shopSlug)

			// Fetch all shops
		} else {
			const shops = await Shop.find().sort({ _id: -1 })
			return NextResponse.json(shops)
		}
	} catch (error) {
		console.error('[SHOPS] Data fetch error:', error)
		return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
	}
}
