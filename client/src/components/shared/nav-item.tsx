import Link from 'next/link'

interface Props {
	href: string
	label: string
	activeLink: string
	handleLinkClick: (link: string) => void
}

export const NavItem = ({ href, label, activeLink, handleLinkClick }: Props) => {
	return (
		<li>
			<Link href={href} className={activeLink === href ? 'active' : ''} onClick={() => handleLinkClick(href)}>
				{label}
			</Link>
		</li>
	)
}
