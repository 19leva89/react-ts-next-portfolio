import { NextApiRequest, NextApiResponse } from 'next'

import { Contact } from '@/models/contact'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		try {
			const { firstName, lastName, email, company, phone, country, price, description, project } = req.body

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

			res.status(201).json(contactDoc)
		} catch (error) {
			console.error('[CONTACTS_CREATE] Error creating:', error)
			res.status(500).json({ error: 'Internal server error' })
		}
	} else {
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}
