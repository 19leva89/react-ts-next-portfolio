import NextAuth from 'next-auth'

import fullConfig from '@/auth.full.config'

export const { auth, handlers, signIn, signOut } = NextAuth(fullConfig)
