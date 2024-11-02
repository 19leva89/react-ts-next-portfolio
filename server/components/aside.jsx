import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

import { GrGallery } from 'react-icons/gr'
import { BsPostcard } from 'react-icons/bs'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { IoHome, IoSettingsOutline } from 'react-icons/io5'
import { RiContactsBook3Line, RiShoppingCartLine } from 'react-icons/ri'

export const Aside = ({ asideOpen, handleAsideOpen }) => {
	const router = useRouter()
	const { data: session } = useSession()
	const [clicked, setClicked] = useState(false)
	const [activeLink, setActiveLink] = useState('/')

	const handleClick = () => {
		setClicked(!clicked)
	}

	const handleLinkClick = (link) => {
		setActiveLink((preActive) => (preActive === link ? null : link))
		setClicked(false)
	}

	useEffect(() => {
		// update active link state when the page is reloaded
		setActiveLink(router.pathname)
	}, [router.pathname])

	if (session) {
		return (
			<aside className={asideOpen ? 'aside-left active' : 'aside-left'}>
				<ul>
					<Link href="/">
						<li className="nav-active">
							<IoHome />

							<span>Dashboard</span>
						</li>
					</Link>

					<li
						className={activeLink === '/blogs' ? 'nav-active flex-col flex-left' : 'flex-col flex-left'}
						onClick={() => handleLinkClick('/blogs')}
					>
						<div className="flex gap-1">
							<BsPostcard />

							<span>Blogs</span>
						</div>

						{activeLink === '/blogs' && (
							<ul>
								<Link href="/blogs">
									<li>All Blogs</li>
								</Link>

								<Link href="/blogs/draft-blogs">
									<li>Draft Blogs</li>
								</Link>

								<Link href="/blogs/add-blog">
									<li>Add Blog</li>
								</Link>
							</ul>
						)}
					</li>

					<li
						className={activeLink === '/projects' ? 'nav-active flex-col flex-left' : 'flex-col flex-left'}
						onClick={() => handleLinkClick('/projects')}
					>
						<div className="flex gap-1">
							<MdOutlineWorkOutline />

							<span>Projects</span>
						</div>

						{activeLink === '/projects' && (
							<ul>
								<Link href="/projects">
									<li>All Projects</li>
								</Link>

								<Link href="/projects/draft-projects">
									<li>Draft Projects</li>
								</Link>

								<Link href="/projects/add-project">
									<li>Add Project</li>
								</Link>
							</ul>
						)}
					</li>

					<li
						className={activeLink === '/shops' ? 'nav-active flex-col flex-left' : 'flex-col flex-left'}
						onClick={() => handleLinkClick('/shops')}
					>
						<div className="flex gap-1">
							<RiShoppingCartLine />

							<span>Shops</span>
						</div>

						{activeLink === '/shops' && (
							<ul>
								<Link href="/shops">
									<li>All Products</li>
								</Link>

								<Link href="/shops/draft-shop">
									<li>Draft Products</li>
								</Link>

								<Link href="/shops/add-product">
									<li>Add Product</li>
								</Link>
							</ul>
						)}
					</li>

					<li
						className={activeLink === '/gallery' ? 'nav-active flex-col flex-left' : 'flex-col flex-left'}
						onClick={() => handleLinkClick('/gallery')}
					>
						<div className="flex gap-1">
							<GrGallery />

							<span>Gallery</span>
						</div>

						{activeLink === '/gallery' && (
							<ul>
								<Link href="/gallery">
									<li>All Photos</li>
								</Link>

								<Link href="/gallery/add-photo">
									<li>Add Photo</li>
								</Link>
							</ul>
						)}
					</li>

					<Link href="/contacts">
						<li
							className={activeLink === '/contacts' ? 'nav-active' : ''}
							onClick={() => handleLinkClick('/contacts')}
						>
							<RiContactsBook3Line />

							<span>Contacts</span>
						</li>
					</Link>

					<Link href="/settings">
						<li
							className={activeLink === '/settings' ? 'nav-active' : ''}
							onClick={() => handleLinkClick('/settings')}
						>
							<IoSettingsOutline />

							<span>Settings</span>
						</li>
					</Link>
				</ul>

				<button onClick={() => signOut()} className="logout-btn">
					Logout
				</button>
			</aside>
		)
	}
}
