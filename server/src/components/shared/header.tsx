'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

import { GoScreenFull } from 'react-icons/go'
import { BiExitFullscreen } from 'react-icons/bi'
import { RiBarChartHorizontalLine } from 'react-icons/ri'

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
		<header className="header flex flex-sb">
			<div className="logo flex gap-2">
				<h1 className="uppercase">Admin</h1>

				{session ? (
					<div className="header-ham flex flex-center" onClick={handleAsideOpen}>
						<RiBarChartHorizontalLine />
					</div>
				) : null}
			</div>

			<div className="right-nav flex gap-2">
				<div onClick={toggleFullscreen}>{isFullscreen ? <BiExitFullscreen /> : <GoScreenFull />}</div>

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
