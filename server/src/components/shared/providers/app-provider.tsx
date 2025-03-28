import NextTopLoader from 'nextjs-toploader'
import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui'

export const AppProvider = ({ children }: PropsWithChildren) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>

			<Toaster position="bottom-right" expand={false} richColors />

			<NextTopLoader showSpinner={false} />
		</>
	)
}
