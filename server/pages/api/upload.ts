import cloudinary from 'cloudinary'
import multiparty from 'multiparty'
import { NextApiRequest, NextApiResponse } from 'next'

import { mongooseConnect } from '@/lib/mongoose'

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

interface FormResult {
	fields: { [key: string]: string[] | undefined }
	files: { [key: string]: { path: string }[] | undefined }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await mongooseConnect()

	const form = new multiparty.Form()

	try {
		const { files } = await new Promise<FormResult>((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) {
					return reject(err) // Добавляем return
				}
				resolve({ fields, files })
			})
		})

		if (!files || !files.file) {
			return res.status(400).json({ error: 'No files uploaded' })
		}

		const links = []
		for (const file of files.file) {
			const options: cloudinary.UploadApiOptions = {
				folder: 'blogs-admin',
				public_id: `file_${Date.now()}`,
				resource_type: 'auto',
			}

			if (!file.path) {
				return res.status(400).json({ error: 'File path is missing' })
			}

			try {
				const result = await cloudinary.v2.uploader.upload(file.path, options)
				links.push(result.secure_url)
			} catch (error) {
				if (error instanceof Error) {
					return res.status(500).json({ error: 'Upload failed', details: error.message })
				}

				return res.status(500).json({ error: 'Upload failed', details: 'Unknown error' })
			}
		}

		return res.json({ links })
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: 'An error occurred', details: error.message })
		}

		return res.status(500).json({ error: 'An error occurred', details: 'Unknown error' })
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
}
