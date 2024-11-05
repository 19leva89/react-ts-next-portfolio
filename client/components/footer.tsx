import Link from 'next/link'

import { GrLinkedinOption } from 'react-icons/gr'
import { LiaBasketballBallSolid } from 'react-icons/lia'
import { FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa6'
import Image from 'next/image'

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-sec flex flex-center flex-col gap-2">
				<div className="logo">
					<Image src="/img/logo-white.png" alt="logo" width={65} height={65} />
				</div>

				<ul className="flex gap-2">
					<li>
						<Link href="/services">Services</Link>
					</li>

					<li>
						<Link href="/projects">Works</Link>
					</li>

					<li>
						<Link href="/assets/Soboliev_Dmitry_Node_React_Next_Dev.pdf" target="_blank">
							Resume
						</Link>
					</li>

					<li>
						<Link href="/services">Skills</Link>
					</li>

					<li>
						<Link href="/services">Testimonials</Link>
					</li>

					<li>
						<Link href="/contacts">Contacts</Link>
					</li>
				</ul>

				<ul className="hero-social">
					<li>
						<Link href="/" target="_blank">
							<FaTwitter />
						</Link>
					</li>

					<li>
						<Link href="https://facebook.com/dimochka.sobolev" target="_blank">
							<FaFacebookF />
						</Link>
					</li>

					<li>
						<Link href="/" target="_blank">
							<LiaBasketballBallSolid />
						</Link>
					</li>

					<li>
						<Link href="https://linkedin.com/in/lev-dmitry" target="_blank">
							<GrLinkedinOption />
						</Link>
					</li>

					<li>
						<Link href="https://github.com/19leva89" target="_blank">
							<FaGithub />
						</Link>
					</li>
				</ul>

				<div className="copyrights">
					&copy; 2024. All Rights Reserved by <span>Sobolev.in</span>
				</div>
			</div>
		</footer>
	)
}
