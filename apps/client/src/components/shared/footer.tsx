import Link from 'next/link'
import Image from 'next/image'
import { GlobeIcon } from 'lucide-react'

import GithubIcon from '@/assets/icons/github.svg'
import TwitterIcon from '@/assets/icons/twitter.svg'
import FacebookIcon from '@/assets/icons/facebook.svg'
import LinkedinIcon from '@/assets/icons/linkedin.svg'

export const Footer = () => {
	return (
		<footer className='footer'>
			<div className='footer-sec flex flex-col items-center justify-center gap-8'>
				<div className='logo'>
					<Image src='/img/logo-white.png' alt='logo' width={65} height={65} />
				</div>

				<ul className='flex items-center gap-8'>
					<li>
						<Link href='/services'>Services</Link>
					</li>

					<li>
						<Link href='/projects'>Works</Link>
					</li>

					<li>
						<Link
							href='/assets/Soboliev_Dmitry_Node_React_Next_Dev.pdf'
							target='_blank'
							rel='noopener noreferrer'
						>
							Resume
						</Link>
					</li>

					<li>
						<Link href='/services'>Skills</Link>
					</li>

					<li>
						<Link href='/services'>Testimonials</Link>
					</li>

					<li>
						<Link href='/contacts'>Contacts</Link>
					</li>
				</ul>

				<ul className='hero-social'>
					<li>
						<Link href='/' target='_blank' rel='noopener noreferrer' className='group/animate'>
							<TwitterIcon
								size={20}
								className='group-hover/animate:stroke-pure-white stroke-main-site-color'
							/>
						</Link>
					</li>

					<li>
						<Link
							href='https://facebook.com/dimochka.sobolev'
							target='_blank'
							rel='noopener noreferrer'
							className='group/animate'
						>
							<FacebookIcon
								size={20}
								className='group-hover/animate:stroke-pure-white stroke-main-site-color'
							/>
						</Link>
					</li>

					<li>
						<Link href='/' target='_blank' rel='noopener noreferrer' className='group/animate'>
							<GlobeIcon size={20} className='group-hover/animate:stroke-pure-white stroke-main-site-color' />
						</Link>
					</li>

					<li>
						<Link
							href='https://linkedin.com/in/lev-dmitry'
							target='_blank'
							rel='noopener noreferrer'
							className='group/animate'
						>
							<LinkedinIcon
								size={20}
								className='group-hover/animate:stroke-pure-white stroke-main-site-color'
							/>
						</Link>
					</li>

					<li>
						<Link
							href='https://github.com/19leva89'
							target='_blank'
							rel='noopener noreferrer'
							className='group/animate'
						>
							<GithubIcon
								size={20}
								className='group-hover/animate:stroke-pure-white stroke-main-site-color'
							/>
						</Link>
					</li>
				</ul>

				<div className='copyrights'>
					&copy; 2025-2026. All rights reserved by <span>Sobolev.in</span>
				</div>
			</div>
		</footer>
	)
}
