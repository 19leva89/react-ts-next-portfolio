import { NextApiRequest, NextApiResponse } from 'next'

import { Shop } from '@/models/shop'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		const { title, slug, images, description, tags, affiliateLink, price, status } = req.body

		const productDoc = await Shop.create({
			title,
			slug,
			images,
			description,
			tags,
			affiliateLink,
			price,
			status,
		})

		res.json(productDoc)
	}

	if (method === 'GET') {
		if (req.query.id) {
			const product = await Shop.findById(req.query.id)

			res.json(product)
		} else {
			const products = await Shop.find()

			res.json(products.reverse())
		}
	}

	if (method === 'PUT') {
		const { _id, title, slug, images, description, tags, affiliateLink, price, status } = req.body

		await Shop.updateOne(
			{ _id },
			{
				title,
				slug,
				images,
				description,
				tags,
				affiliateLink,
				price,
				status,
			},
		)

		res.json(true)
	}

	if (method === 'DELETE') {
		if (req.query.id) {
			await Shop.deleteOne({ _id: req.query.id })

			res.json(true)
		}
	}
}
