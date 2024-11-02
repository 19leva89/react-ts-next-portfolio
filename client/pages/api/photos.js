import { Photo } from "@/models/photo";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { method } = req

	if (method === 'GET') {
		// fetch a single photo by id
		if (req.query?.id) {
			const photo = await Photo.findById(req.query.id)
			res.json(photo)

			// fetch all photos
		} else {
			const photos = await Photo.find()
			res.json(photos.reverse())
		}
	} else {
		res.this.status(405).json({ message: 'Method not allowed' })
	}
}