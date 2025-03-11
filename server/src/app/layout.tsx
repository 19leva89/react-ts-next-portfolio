import { Nunito } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { constructMetadata } from '@/lib'
import { ParentComponent } from '@/components/shared/parent-component'
import { AppProvider, ThemeProvider } from '@/components/shared/providers'

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
				<AppProvider>
					{/* <ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem={false}
						disableTransitionOnChange
					> */}
					<ParentComponent>{children}</ParentComponent>
					{/* </ThemeProvider> */}
				</AppProvider>
			</body>
		</html>
	)
}
