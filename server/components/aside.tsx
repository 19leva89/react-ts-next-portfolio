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
	onLinkClick: (link: string) => void
}

const NavItem = ({ title, links, activeLink, icon: Icon, onLinkClick }: NavItemProps) => (
	<>
		{links.length > 1 ? (
			<li className="flex-col flex-left m-05" onClick={() => onLinkClick(links[0].href)}>
				<div className="flex gap-1">
					<Icon />

					<span>{title}</span>
				</div>

				{links.some((link) => link.href === activeLink) && (
					<ul>
						{links.map(({ href, label }) => (
							<Link key={href} href={href}>
								<li className={activeLink === href ? 'nav-active' : ''}>{label}</li>
							</Link>
						))}
					</ul>
				)}
			</li>
		) : (
			<li
				className={
					activeLink === links[0].href ? 'nav-active flex-col flex-left m-05' : 'flex-col flex-left m-05'
				}
				onClick={() => onLinkClick(links[0].href)}
			>
				<Link href={links[0].href}>
					<div className="flex gap-1">
						<Icon />

						<span>{title}</span>
					</div>
				</Link>
			</li>
		)}
	</>
)

export const Aside = ({ asideOpen }: AsideProps) => {
	const router = useRouter()
	const { data: session } = useSession()

	const [activeLink, setActiveLink] = useState('/')

	const handleLinkClick = (link: string) => {
		setActiveLink((preActive) => (preActive === link ? '' : link))
		router.push(link)
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
						onLinkClick={handleLinkClick}
					/>

					{/* Contacts */}
					<NavItem
						title="Contacts"
						links={[{ href: '/contacts', label: 'Contacts' }]}
						activeLink={activeLink}
						icon={RiContactsBook3Line}
						onLinkClick={handleLinkClick}
					/>

					{/* Settings */}
					<NavItem
						title="Settings"
						links={[{ href: '/settings', label: 'Settings' }]}
						activeLink={activeLink}
						icon={IoSettingsOutline}
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
