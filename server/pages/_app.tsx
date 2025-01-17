import { useState } from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'
import { ParentComponent } from '@/components'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	const [asideOpen, setAsideOpen] = useState(false)

	const asideClickOpen = () => {
		setAsideOpen(!asideOpen)
	}

	return (
		<SessionProvider session={session}>
			<ParentComponent appOpen={asideOpen} appAsideOpen={asideClickOpen} />

			<main>
				<div className={asideOpen ? 'container' : 'container active'}>
					<Component {...pageProps} />
				</div>
			</main>
		</SessionProvider>
	)
}

export default App
