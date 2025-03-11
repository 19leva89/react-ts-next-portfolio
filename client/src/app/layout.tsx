import { Nunito } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { constructMetadata } from '@/lib/utils'
import { DarkModeProvider } from '@/hooks/use-dark-mode'
import { ClientLayout, Footer, Header } from '@/components/shared'

import 'aos/dist/aos.css'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = constructMetadata()

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={nunito.variable}>
				<DarkModeProvider>
					<ClientLayout>
						<Header />

						<main id="site-wrapper">{children}</main>

						<Footer />
					</ClientLayout>
				</DarkModeProvider>
			</body>
		</html>
	)
}
