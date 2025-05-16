import type { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { connectToDatabase } from '@/lib/mongo-db'

const authFullConfig: NextAuthConfig = {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<User | null> {
				if (!credentials) return null

				const db = await connectToDatabase()
				const user = await db.collection('admin').findOne({ email: credentials.email })

				if (user && user.password === credentials.password) {
					return { id: user._id.toString(), email: user.email }
				}

				return null
			},
		}),
	],
	pages: {
		signIn: '/auth/sign-in',
	},
}

export default authFullConfig
