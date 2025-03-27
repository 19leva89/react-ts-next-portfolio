'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { KanbanIcon, MaximizeIcon, MinimizeIcon } from 'lucide-react'

interface HeaderProps {
	handleAsideOpen: () => void
}

export const Header = ({ handleAsideOpen }: HeaderProps) => {
	const { data: session } = useSession()
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen()

			setIsFullscreen(true)
		} else if (document.exitFullscreen) {
			document.exitFullscreen()

			setIsFullscreen(false)
		}
	}

	return (
		<header className="header flex items-center justify-between">
			<div className="logo flex items-center gap-8">
				<h1 className="uppercase">Admin</h1>

				{session ? (
					<div className="header-ham flex items-center justify-center" onClick={handleAsideOpen}>
						<KanbanIcon size={22} className="rotate-270" />
					</div>
				) : null}
			</div>

			<div className="right-nav flex items-center gap-8">
				<div onClick={toggleFullscreen}>
					{isFullscreen ? <MinimizeIcon size={22} /> : <MaximizeIcon size={22} />}
				</div>

				<div className="notification">
					<Image src="/img/notification.png" alt="notification" width={22} height={22} loading="lazy" />
				</div>

				<div className="profile-nav">
					<Image src="/img/user.png" alt="user" width={120} height={54} loading="lazy" />
				</div>
			</div>
		</header>
	)
}
