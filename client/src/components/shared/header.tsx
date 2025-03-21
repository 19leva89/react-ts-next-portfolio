'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { NavItem } from '@/components/shared'
import { navItems } from '@/constants/nav-items'
import { useDarkMode } from '@/hooks/use-dark-mode'

import { LuSunMoon } from 'react-icons/lu'
import { IoMoonSharp } from 'react-icons/io5'
import { HiMiniBars3BottomRight } from 'react-icons/hi2'

export const Header = () => {
	const pathname = usePathname()
	const { darkMode, toggleDarkMode } = useDarkMode()
	const [mobile, setMobile] = useState<boolean>(false)
	const [isSticky, setIsSticky] = useState<boolean>(false)
	const [activeLink, setActiveLink] = useState<string>('/')

	const handleLinkClick = (link: string) => {
		setActiveLink((preActive) => (preActive === link ? '' : link))
		setMobile(false)
	}

	const handleMobileOpen = () => {
		setMobile(!mobile)
	}

	const handleMobileClose = () => {
		setMobile(false)
	}

	const handleScroll = () => {
		setIsSticky(window.scrollY > 0)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (pathname !== null) {
			setActiveLink(pathname)
		}
	}, [pathname])

	return (
		<header className={isSticky ? 'sticky' : ''}>
			<nav className="container m-auto flex items-center justify-between gap-8">
				<div className="logo flex items-center gap-8">
					<Link href="/">
						<Image
							src={darkMode ? '/img/logo-dark.png' : '/img/logo-white.png'}
							alt="logo"
							width={65}
							height={65}
						/>
					</Link>

					<h2>
						<Link href="mailto:d.sobolev.dev@gmail.com" target="_blank" rel="noopener noreferrer">
							d.sobolev.dev@gmail.com
						</Link>
					</h2>
				</div>

				<div className="navlist flex items-center gap-4">
					<ul className="flex items-center gap-8">
						{navItems.map(({ href, label }) => (
							<NavItem
								key={href}
								href={href}
								label={label}
								activeLink={activeLink}
								handleLinkClick={handleLinkClick}
							/>
						))}
					</ul>

					<div
						className="dark-mode-toggle"
						onClick={() => {
							console.log('Dark mode toggled')
							toggleDarkMode()
						}}
					>
						{darkMode ? <IoMoonSharp /> : <LuSunMoon />}
					</div>

					<button>
						<Link href="/contacts">Hire Me!</Link>
					</button>

					<div className="mobile-toggle-svg" onClick={handleMobileOpen}>
						<HiMiniBars3BottomRight />
					</div>
				</div>

				<div className={mobile ? 'mobile-navlist active' : 'mobile-navlist'}>
					<span className={mobile ? 'active' : ''} onClick={handleMobileClose}></span>

					<div className="mobile-logo">
						<Image src="/img/logo-white.png" alt="logo" width={60} height={60} />

						<h2>Sobolev</h2>
					</div>

					<ul className="flex flex-col items-start justify-start gap-4 mt-12" onClick={handleMobileClose}>
						{navItems.map(({ href, label }) => (
							<NavItem
								key={href}
								href={href}
								label={label}
								activeLink={activeLink}
								handleLinkClick={handleLinkClick}
							/>
						))}
					</ul>

					<p>Copyright &copy; 2024 | sobolev.in</p>
				</div>
			</nav>
		</header>
	)
}
