import type { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { connectToDatabase } from '@/lib/mongo-db'

export default {
	providers: [
		Credentials({
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
} satisfies NextAuthConfig
