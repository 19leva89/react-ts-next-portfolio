import Link from 'next/link'

export const NavItem = ({ href, label, activeLink, handleLinkClick }) => {
	return (
		<li>
			<Link href={href} className={activeLink === href ? 'active' : ''} onClick={() => handleLinkClick(href)}>
				{label}
			</Link>
		</li>
	)
}
