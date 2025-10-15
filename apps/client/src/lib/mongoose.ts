import mongoose, { Connection } from 'mongoose'

export const mongooseConnect = async (): Promise<Connection> => {
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection as Connection
	} else {
		const uri = process.env.DATABASE_URL

		if (!uri) {
			throw new Error('DATABASE_URL is not defined in the environment variables')
		}

		await mongoose.connect(uri)

		return mongoose.connection
	}
}
