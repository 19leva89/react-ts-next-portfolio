import { NextApiRequest, NextApiResponse } from 'next'

import { Shop } from '@/models/shop'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'GET') {
		// fetch a single shop by id
		if (req.query?.id) {
			const shop = await Shop.findById(req.query.id)
			res.json(shop)

			// fetch shop by slug
		} else if (req.query?.slug) {
			const shopSlug = await Shop.find({ slug: req.query.slug })
			res.json(shopSlug.reverse())

			// fetch all shops
		} else {
			const shops = await Shop.find()
			res.json(shops.reverse())
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' })
	}
}
