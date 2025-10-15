'use client'

import Link from 'next/link'
import {
	BriefcaseBusinessIcon,
	HouseIcon,
	IdCardIcon,
	ImagesIcon,
	LucideIcon,
	NotebookTabsIcon,
	SettingsIcon,
	ShoppingCartIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

interface AsideProps {
	asideOpen: boolean
	handleAsideOpen?: () => void
}

interface NavItemProps {
	title: string
	links: { href: string; label: string }[]
	activeLink: string
	icon: LucideIcon
	isOpen: boolean
	onToggle: () => void
	onLinkClick: (link: string) => void
}

const NavItem = ({ title, links, activeLink, icon: Icon, isOpen, onToggle, onLinkClick }: NavItemProps) => {
	if (links.length === 0) return null

	if (links.length === 1) {
		const link = links[0]!

		return (
			<Link href={link.href}>
				<li
					className={
						activeLink === link.href
							? 'nav-active m-2 flex-col items-start justify-start'
							: 'm-2 flex-col items-start justify-start'
					}
					onClick={() => onLinkClick(link.href)}
				>
					<div className='flex items-center gap-4 p-4'>
						<Icon />

						<span>{title}</span>
					</div>
				</li>
			</Link>
		)
	}

	return (
		<li className='m-2 flex-col items-start justify-start'>
			<div className='flex items-center gap-4 p-4' onClick={onToggle}>
				<Icon />

				<span>{title}</span>
			</div>

			{isOpen && (
				<ul>
					{links.map(({ href, label }) => (
						<Link key={href} href={href}>
							<li
								className={activeLink === href ? 'nav-active' : ''}
								onClick={() => {
									onLinkClick(href)
								}}
							>
								{label}
							</li>
						</Link>
					))}
				</ul>
			)}
		</li>
	)
}

export const Aside = ({ asideOpen }: AsideProps) => {
	const pathname = usePathname()
	const { data: session } = useSession()

	const [activeLink, setActiveLink] = useState<string>('/')
	const [openNavItem, setOpenNavItem] = useState<string | null>(null)

	const handleLinkClick = (link: string) => {
		setActiveLink(link)
	}

	const toggleNavItem = (title: string) => {
		setOpenNavItem((prev) => (prev === title ? null : title))
	}

	useEffect(() => {
		// update active link state when the page is reloaded
		if (pathname !== null) {
			setActiveLink(pathname)
		}
	}, [pathname])

	if (session) {
		return (
			<aside className={asideOpen ? 'aside-left active' : 'aside-left'}>
				<ul>
					{/* Dashboard */}
					<NavItem
						title='Dashboard'
						links={[{ href: '/dashboard', label: 'Dashboard' }]}
						activeLink={activeLink}
						icon={HouseIcon}
						isOpen={openNavItem === 'Dashboard'}
						onToggle={() => toggleNavItem('Dashboard')}
						onLinkClick={handleLinkClick}
					/>

					{/* Projects */}
					<NavItem
						title='Projects'
						links={[
							{ href: '/projects', label: 'All projects' },
							{ href: '/projects/draft-projects', label: 'Draft projects' },
							{ href: '/projects/add-project', label: 'Add project' },
						]}
						activeLink={activeLink}
						icon={BriefcaseBusinessIcon}
						isOpen={openNavItem === 'Projects'}
						onToggle={() => toggleNavItem('Projects')}
						onLinkClick={handleLinkClick}
					/>

					{/* Blogs */}
					<NavItem
						title='Blogs'
						links={[
							{ href: '/blogs', label: 'All blogs' },
							{ href: '/blogs/draft-blogs', label: 'Draft blogs' },
							{ href: '/blogs/add-blog', label: 'Add blog' },
						]}
						activeLink={activeLink}
						icon={IdCardIcon}
						isOpen={openNavItem === 'Blogs'}
						onToggle={() => toggleNavItem('Blogs')}
						onLinkClick={handleLinkClick}
					/>

					{/* Gallery */}
					<NavItem
						title='Gallery'
						links={[
							{ href: '/gallery', label: 'All photos' },
							{ href: '/gallery/add-photo', label: 'Add photo' },
						]}
						activeLink={activeLink}
						icon={ImagesIcon}
						isOpen={openNavItem === 'Gallery'}
						onToggle={() => toggleNavItem('Gallery')}
						onLinkClick={handleLinkClick}
					/>

					{/* Shop */}
					<NavItem
						title='Shop'
						links={[
							{ href: '/shop', label: 'All products' },
							{ href: '/shop/draft-products', label: 'Draft products' },
							{ href: '/shop/add-product', label: 'Add product' },
						]}
						activeLink={activeLink}
						icon={ShoppingCartIcon}
						isOpen={openNavItem === 'Shop'}
						onToggle={() => toggleNavItem('Shop')}
						onLinkClick={handleLinkClick}
					/>

					{/* Contacts */}
					<NavItem
						title='Contacts'
						links={[{ href: '/contacts', label: 'Contacts' }]}
						activeLink={activeLink}
						icon={NotebookTabsIcon}
						isOpen={openNavItem === 'Contacts'}
						onToggle={() => toggleNavItem('Contacts')}
						onLinkClick={handleLinkClick}
					/>

					{/* Settings */}
					<NavItem
						title='Settings'
						links={[{ href: '/settings', label: 'Settings' }]}
						activeLink={activeLink}
						icon={SettingsIcon}
						isOpen={openNavItem === 'Settings'}
						onToggle={() => toggleNavItem('Settings')}
						onLinkClick={handleLinkClick}
					/>
				</ul>

				{/* Logout */}
				<button onClick={() => signOut()} className='logout-btn'>
					Logout
				</button>
			</aside>
		)
	}
}
