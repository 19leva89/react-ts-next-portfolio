import mongoose from "mongoose";

export const mongooseConnect = () => {
	if (mongoose.connection.readyState === 1) {
		return mongoose.connection.asPromise()
	} else {
		const uri = process.env.DATABASE_URL

		return mongoose.connect(uri)
	}
}