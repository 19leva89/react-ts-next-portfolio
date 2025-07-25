import { Nunito } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { constructMetadata } from '@/lib/utils'
import { ThemeProvider } from '@/components/shared/providers'
import { ClientLayout, Footer, Header } from '@/components/shared'

import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = constructMetadata()

export default async function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={nunito.variable}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem={false} enableColorScheme>
					<ClientLayout>
						<Header />

						<main id='site-wrapper'>{children}</main>

						<Footer />
					</ClientLayout>
				</ThemeProvider>
			</body>
		</html>
	)
}
