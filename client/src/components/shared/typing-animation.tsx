'use client'

import Typed from 'typed.js'
import { useEffect, useRef } from 'react'

export const TypingAnimation = () => {
	const el = useRef(null)

	useEffect(() => {
		const options = {
			strings: ['Backend dev', 'Frontend dev', 'Full Stack dev', 'UX Designer'],
			typeSpeed: 50,
			backSpeed: 50,
			backDelay: 1000,
			startDelay: 500,
			loop: true,
		}

		const typed = new Typed(el.current, options)

		return () => {
			typed.destroy()
		}
	}, [])

	return <span ref={el} className='typed-text' />
}
