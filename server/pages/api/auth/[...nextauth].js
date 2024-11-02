import NextAuth from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"

import { connectToDatabase } from "@/lib/mongo-db";


export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Enter your email" },
				password: { label: "Password", type: "password", placeholder: "Enter your password" },
			},

			async authorize(credentials, req) {
				const db = await connectToDatabase()
				const collection = db.collection("admin")

				const user = await collection.findOne({ email: credentials.email })

				if (user && user.password === credentials.password) {
					return { id: user._id, email: user.email };
				}

				return null
			}
		}),
	],

	database: process.env.DATABASE_URL,

	// session: {
	// 	strategy: "jwt",
	// },

	// jwt: {
	// 	secret: process.env.JWT_SECRET,
	// },

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user._id;
			}

			return token
		},

		async session({ session, token }) {
			session.user._id = token._id
			return session
		},
	},

	pages: {
		signIn: "/auth/sign-in",
	},
}

export default NextAuth(authOptions)