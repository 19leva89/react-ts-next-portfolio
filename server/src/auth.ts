import { JWT } from 'next-auth/jwt'
import NextAuth, { Session, User } from 'next-auth'

import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',
		maxAge: 30 * 60, // 30 minutes
		updateAge: 10 * 60, // 10 minutes
	},

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

	...authConfig,
})
