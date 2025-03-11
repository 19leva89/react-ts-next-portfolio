import Aos from 'aos'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { DarkModeProvider } from '@/hooks/use-dark-mode'
import { Footer, Header, Preloader } from '@/components'

import 'aos/dist/aos.css'
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		return () => clearTimeout(timeoutId)
	}, [])

	// aos animation
	useEffect(() => {
		Aos.init({
			// Global settings:
			disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
			startEvent: 'DOMContentLoaded',
			initClassName: 'aos-init',
			animatedClassName: 'aos-animate',
			useClassNames: false,
			disableMutationObserver: false,
			debounceDelay: 50,
			throttleDelay: 99,

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 100,
			delay: 0,
			duration: 900,
			easing: 'ease',
			once: false,
			mirror: false,
			anchorPlacement: 'top-bottom',
		})

		if (!isLoading) {
			Aos.refresh()
		}
	}, [isLoading])

	return (
		<DarkModeProvider>
			<Preloader isLoading={isLoading}>
				{!isLoading && (
					<>
						<Header />

						<main id="site-wrapper">
							<Component {...pageProps} />
						</main>

						<Footer />
					</>
				)}
			</Preloader>
		</DarkModeProvider>
	)
}

export default App
