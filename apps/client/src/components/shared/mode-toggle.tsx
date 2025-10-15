'use client'

import { useCallback } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'

import { META_THEME_COLORS, useMetaColor } from '@/hooks/use-meta-color'

export const ModeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme()
	const { setMetaColor } = useMetaColor()

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
		setMetaColor(resolvedTheme === 'dark' ? META_THEME_COLORS.light : META_THEME_COLORS.dark)
	}, [resolvedTheme, setTheme, setMetaColor])

	return (
		<div className='dark-mode-toggle size-10 sm:size-12' onClick={toggleTheme}>
			<SunIcon size={28} className='hidden [html.dark_&]:block' />

			<MoonIcon size={28} className='hidden [html.light_&]:block' />

			<span className='sr-only'>Toggle theme</span>
		</div>
	)
}
