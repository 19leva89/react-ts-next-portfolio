import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
		unoptimized: true,
	},
	experimental: {
		nodeMiddleware: true, // Enable Node.js middleware
	},
	reactStrictMode: false,
}

export default nextConfig
