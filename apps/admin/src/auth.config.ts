import { compare } from 'bcrypt-ts'
import type { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { connectToDatabase } from '@/lib/mongo-db'

type CredentialsType = {
	email: string
	password: string
}

export default {
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<User | null> {
				try {
					if (!credentials) {
						console.error('No credentials provided')
						return null
					}

					const { email, password } = credentials as Partial<CredentialsType>

					if (!email || !password) {
						console.error('Missing email or password')
						return null
					}

					const db = await connectToDatabase()
					const user = await db.collection('admin').findOne({ email })

					if (!user) {
						console.error('User not found')
						return null
					}

					if (!user.password) {
						console.error('User has no password set')
						return null
					}

					const passwordsMatch = await compare(password, user.password)

					if (!passwordsMatch) {
						console.error('Invalid password')
						return null
					}

					return {
						id: user._id.toString(),
						email: user.email,
					}
				} catch (error) {
					console.error('Authentication error:', error)
					return null
				}
			},
		}),
	],
} satisfies NextAuthConfig
