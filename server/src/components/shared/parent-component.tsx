'use client'

import { PropsWithChildren, useState } from 'react'

import { Aside, Header } from '@/components/shared'

export function ParentComponent({ children }: PropsWithChildren) {
	const [asideOpen, setAsideOpen] = useState<boolean>(false)

	const asideClickOpen = () => {
		setAsideOpen(!asideOpen)
	}

	return (
		<>
			<Header handleAsideOpen={asideClickOpen} />

			<Aside asideOpen={asideOpen} handleAsideOpen={asideClickOpen} />

			<main>
				<div className={asideOpen ? 'container' : 'container active'}>{children}</div>
			</main>
		</>
	)
}
