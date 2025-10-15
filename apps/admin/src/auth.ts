import NextAuth, { type NextAuthResult } from 'next-auth'

import authConfig from '@/auth.config'

const authResult = NextAuth({
	secret: process.env.AUTH_SECRET,

	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day
	},

	pages: {
		signIn: '/auth/sign-in',
	},

	...authConfig,
})

export const auth: NextAuthResult['auth'] = authResult.auth
export const handlers: NextAuthResult['handlers'] = authResult.handlers
export const signIn: NextAuthResult['signIn'] = authResult.signIn
export const signOut: NextAuthResult['signOut'] = authResult.signOut
