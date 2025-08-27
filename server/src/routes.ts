/**
 * An array of routes that are accessible to the protected
 * These routes require authentication
 * @type {string[]}
 */
export const protectedRoutes = [
	'/',
	'/dashboard',
	'/blogs',
	'/contacts',
	'/gallery',
	'/projects',
	'/settings',
	'/shop',
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ['/auth/sign-in', '/auth/sign-up', '/auth/reset']

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'
