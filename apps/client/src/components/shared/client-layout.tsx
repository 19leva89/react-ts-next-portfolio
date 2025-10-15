'use client'

import Aos from 'aos'
import { PropsWithChildren, useEffect, useState } from 'react'

import { Preloader } from '@/components/shared'

import 'aos/dist/aos.css'

export const ClientLayout = ({ children }: PropsWithChildren) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsLoading(false)
		}, 3000)

		return () => clearTimeout(timeoutId)
	}, [])

	// AOS animation
	useEffect(() => {
		Aos.init({
			disable: false,
			startEvent: 'DOMContentLoaded',
			initClassName: 'aos-init',
			animatedClassName: 'aos-animate',
			useClassNames: false,
			disableMutationObserver: false,
			debounceDelay: 50,
			throttleDelay: 99,
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

	return <Preloader isLoading={isLoading}>{!isLoading && children}</Preloader>
}
