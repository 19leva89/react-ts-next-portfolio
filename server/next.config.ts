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
	reactStrictMode: false,
}

export default nextConfig
