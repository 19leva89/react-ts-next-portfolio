import NextAuth from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

import edgeConfig from '@/auth.config'

const { auth } = NextAuth(edgeConfig)

const publicRoutes = ['/auth/sign-in', '/auth/sign-up', '/recovery', '/api/auth']
const protectedRoutes = ['/']

export default auth(async function middleware(req: NextRequest) {
	const session = await auth()
	const path = req.nextUrl.pathname

	// Allow access to public routes and Next.js assets
	if (
		publicRoutes.some((route) => path.startsWith(route)) ||
		path.startsWith('/_next/img') ||
		path.includes('.png')
	) {
		return NextResponse.next()
	}

	// Checking protected routes
	if (protectedRoutes.some((route) => path.startsWith(route)) && !session) {
		const absoluteURL = new URL('/auth/sign-in', req.nextUrl.origin)

		return NextResponse.redirect(absoluteURL.toString())
	}

	return NextResponse.next()
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|images|fonts|css|js).*)'],
}
