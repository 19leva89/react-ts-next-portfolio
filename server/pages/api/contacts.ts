import { NextApiRequest, NextApiResponse } from 'next'

import { Contact } from '@/models/contact'
import { mongooseConnect } from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
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
		})

		res.json(contactDoc)
	}

	if (method === 'GET') {
		if (req.query.id) {
			const contact = await Contact.findById(req.query.id)

			res.json(contact)
		} else {
			const contacts = await Contact.find()

			res.json(contacts.reverse())
		}
	}

	if (method === 'PUT') {
		const { _id, firstName, lastName, email, company, phone, country, price, description, project, viewed } =
			req.body

		await Contact.updateMany(
			{ _id },
			{
				firstName,
				lastName,
				email,
				company,
				phone,
				country,
				price,
				description,
				project,
				viewed,
			},
		)

		res.json(true)
	}

	if (method === 'DELETE') {
		if (req.query.id) {
			await Contact.deleteOne({ _id: req.query.id })

			res.json(true)
		}
	}
}
