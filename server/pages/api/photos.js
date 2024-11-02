import { Photo } from "@/models/photo";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'POST') {
		const { title, slug, images } = req.body

		const photoDoc = await Photo.create({ title, slug, images, })

		res.json(photoDoc)
	}

	if (method === 'GET') {
		if (req.query.id) {
			const photo = await Photo.findById(req.query.id)

			res.json(photo)
		} else {
			const photos = await Photo.find();

			res.json(photos.reverse());
		}
	}

	if (method === 'PUT') {
		const { _id, title, slug, images, } = req.body

		await Photo.updateOne({ _id }, { title, slug, images, })

		res.json(true)
	}

	if (method === 'DELETE') {
		if (req.query.id) {
			await Photo.deleteOne({ _id: req.query.id })

			res.json(true)
		}
	}
}