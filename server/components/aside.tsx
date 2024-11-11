import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { IconType } from 'react-icons'
import { GrGallery } from 'react-icons/gr'
import { BsPostcard } from 'react-icons/bs'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { IoHome, IoSettingsOutline } from 'react-icons/io5'
import { RiContactsBook3Line, RiShoppingCartLine } from 'react-icons/ri'

interface AsideProps {
	asideOpen: boolean
	handleAsideOpen?: () => void
}

interface NavItemProps {
	title: string
	links: { href: string; label: string }[]
	activeLink: string
	icon: IconType
	isOpen: boolean
	onToggle: () => void
	onLinkClick: (link: string) => void
}

const NavItem = ({ title, links, activeLink, icon: Icon, isOpen, onToggle, onLinkClick }: NavItemProps) => (
	<>
		{links.length > 1 ? (
			<li className="flex-col flex-left m-05">
				<div className="flex gap-1 p-1" onClick={onToggle}>
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
		) : (
			<Link href={links[0].href}>
				<li
					className={
						activeLink === links[0].href ? 'nav-active flex-col flex-left m-05' : 'flex-col flex-left m-05'
					}
					onClick={() => onLinkClick(links[0].href)}
				>
					<div className="flex gap-1 p-1">
						<Icon />

						<span>{title}</span>
					</div>
				</li>
			</Link>
		)}
	</>
)

export const Aside = ({ asideOpen }: AsideProps) => {
	const router = useRouter()
	const { data: session } = useSession()

	const [activeLink, setActiveLink] = useState('/')
	const [openNavItem, setOpenNavItem] = useState<string | null>(null)

	const handleLinkClick = (link: string) => {
		setActiveLink(link)
	}

	const toggleNavItem = (title: string) => {
		setOpenNavItem((prev) => (prev === title ? null : title))
	}

	useEffect(() => {
		// update active link state when the page is reloaded
		setActiveLink(router.pathname)
	}, [router.pathname])

	if (session) {
		return (
			<aside className={asideOpen ? 'aside-left active' : 'aside-left'}>
				<ul>
					{/* Dashboard */}
					<NavItem
						title="Dashboard"
						links={[{ href: '/', label: 'Dashboard' }]}
						activeLink={activeLink}
						icon={IoHome}
						isOpen={openNavItem === 'Dashboard'}
						onToggle={() => toggleNavItem('Dashboard')}
						onLinkClick={handleLinkClick}
					/>

					{/* Projects */}
					<NavItem
						title="Projects"
						links={[
							{ href: '/projects', label: 'All Projects' },
							{ href: '/projects/draft-projects', label: 'Draft Projects' },
							{ href: '/projects/add-project', label: 'Add Project' },
						]}
						activeLink={activeLink}
						icon={MdOutlineWorkOutline}
						isOpen={openNavItem === 'Projects'}
						onToggle={() => toggleNavItem('Projects')}
						onLinkClick={handleLinkClick}
					/>

					{/* Blogs */}
					<NavItem
						title="Blogs"
						links={[
							{ href: '/blogs', label: 'All Blogs' },
							{ href: '/blogs/draft-blogs', label: 'Draft Blogs' },
							{ href: '/blogs/add-blog', label: 'Add Blog' },
						]}
						activeLink={activeLink}
						icon={BsPostcard}
						isOpen={openNavItem === 'Blogs'}
						onToggle={() => toggleNavItem('Blogs')}
						onLinkClick={handleLinkClick}
					/>

					{/* Gallery */}
					<NavItem
						title="Gallery"
						links={[
							{ href: '/gallery', label: 'All Photos' },
							{ href: '/gallery/add-photo', label: 'Add Photo' },
						]}
						activeLink={activeLink}
						icon={GrGallery}
						isOpen={openNavItem === 'Gallery'}
						onToggle={() => toggleNavItem('Gallery')}
						onLinkClick={handleLinkClick}
					/>

					{/* Shop */}
					<NavItem
						title="Shop"
						links={[
							{ href: '/shop', label: 'All Products' },
							{ href: '/shop/draft-product', label: 'Draft Products' },
							{ href: '/shop/add-product', label: 'Add Product' },
						]}
						activeLink={activeLink}
						icon={RiShoppingCartLine}
						isOpen={openNavItem === 'Shop'}
						onToggle={() => toggleNavItem('Shop')}
						onLinkClick={handleLinkClick}
					/>

					{/* Contacts */}
					<NavItem
						title="Contacts"
						links={[{ href: '/contacts', label: 'Contacts' }]}
						activeLink={activeLink}
						icon={RiContactsBook3Line}
						isOpen={openNavItem === 'Contacts'}
						onToggle={() => toggleNavItem('Contacts')}
						onLinkClick={handleLinkClick}
					/>

					{/* Settings */}
					<NavItem
						title="Settings"
						links={[{ href: '/settings', label: 'Settings' }]}
						activeLink={activeLink}
						icon={IoSettingsOutline}
						isOpen={openNavItem === 'Settings'}
						onToggle={() => toggleNavItem('Settings')}
						onLinkClick={handleLinkClick}
					/>
				</ul>

				{/* Logout */}
				<button onClick={() => signOut()} className="logout-btn">
					Logout
				</button>
			</aside>
		)
	}
}
