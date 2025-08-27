import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
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
