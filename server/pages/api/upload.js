import cloudinary from 'cloudinary'
import multiparty from 'multiparty'

import { mongooseConnect } from '@/lib/mongoose'


cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
})

export default async (req, res) => {
	await mongooseConnect()

	const form = new multiparty.Form()
	const { fields, files } = await new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) {
				reject(err)
			}

			resolve({ fields, files })
		})
	})

	if (!files || !files.file) {
		return res.status(400).json({ error: 'No files uploaded' })
	}

	const links = []
	for (const file of files.file) {
		const options = {
			folder: 'blogs-admin',
			public_id: `file_${Date.now()}`,
			resource_type: 'auto',
		}

		try {
			const result = await cloudinary.v2.uploader.upload(file.path, options)
			links.push(result.secure_url)
		} catch (error) {
			return res.status(500).json({ error: 'Upload failed', details: error.message })
		}
	}

	return res.json({ links })
}

export const config = {
	api: {
		bodyParser: false
	}
}