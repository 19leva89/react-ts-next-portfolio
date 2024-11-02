import { Profile } from "@/models/profile";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
	// if authenticated, connect to MongoDB
	await mongooseConnect()

	const { email, password } = req.body

	try {
		// check if user already exists
		const existingUser = await Profile.findOne({ email })
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" })
		}

		// create new user
		const newUser = await Profile.create({ email, password })
		res.status(200).json({ message: "User created successfully", user: newUser })
	} catch (error) {
		res.status(500).json({ error: "Error creating user" })
	}
}