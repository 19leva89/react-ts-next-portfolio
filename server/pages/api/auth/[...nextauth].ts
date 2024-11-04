import { JWT } from 'next-auth/jwt'
import NextAuth, { Session, User } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

import { connectToDatabase } from '@/lib/mongo-db'

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
				password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
			},

			async authorize(credentials): Promise<User | null> {
				if (!credentials) {
					throw new Error('Credentials are required')
				}

				const db = await connectToDatabase()
				const collection = db.collection('admin')

				const user = await collection.findOne({ email: credentials.email })

				if (user && user.password === credentials.password) {
					return { id: user._id.toString(), email: user.email }
				}

				return null
			},
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
		async jwt({ token, user }: { token: JWT; user?: User }) {
			if (user) {
				token.id = user.id
			}
			return token
		},

		async session({ session, token }: { session: Session; token: JWT }) {
			if (session.user) {
				session.user.id = token.id as string
			}
			return session
		},
	},

	pages: {
		signIn: '/auth/sign-in',
	},
}

export default NextAuth(authOptions)
