import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { Loading } from '@/components'

interface LoginLayoutProps {
	children: ReactNode
}

export const LoginLayout = ({ children }: LoginLayoutProps) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return (
			<div className="full-h flex flex-center">
				<Loading />
			</div>
		)
	}

	if (!session) {
		router.push('/auth/sign-in')
		return null
	}

	return <>{children}</>
}
