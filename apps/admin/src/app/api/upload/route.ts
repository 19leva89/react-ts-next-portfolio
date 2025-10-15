import cloudinary from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/auth'
import { mongooseConnect } from '@/lib/mongoose'

// Configuration for Cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
	try {
		const session = await auth()

		if (!session) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		await mongooseConnect()

		const formData = await request.formData()

		const files = formData.getAll('file') as File[]
		if (!files || files.length === 0) {
			return NextResponse.json({ error: 'No files uploaded' }, { status: 400 })
		}

		const links = []

		for (const file of files) {
			const buffer = await file.arrayBuffer()
			const array = new Uint8Array(buffer)

			const options: cloudinary.UploadApiOptions = {
				folder: 'blogs-admin',
				public_id: `file_${Date.now()}`,
				resource_type: 'auto',
			}

			try {
				const result = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
					cloudinary.v2.uploader
						.upload_stream(options, (error, result) => {
							if (error) {
								reject(error)
							} else if (result) {
								resolve(result)
							}
						})
						.end(array)
				})

				links.push(result.secure_url)
			} catch (error) {
				return NextResponse.json(
					{ error: 'Upload failed', details: (error as Error).message },
					{ status: 500 },
				)
			}
		}

		return NextResponse.json({ links }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ error: 'An error occurred', details: (error as Error).message },
			{ status: 500 },
		)
	}
}
