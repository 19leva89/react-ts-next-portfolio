import type { NextAuthConfig } from 'next-auth'

const authConfig: NextAuthConfig = {
	providers: [], // 👈 without MongoDB providers
	pages: {
		signIn: '/auth/sign-in',
	},
}

export default authConfig
