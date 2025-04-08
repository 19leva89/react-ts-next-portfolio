import Link from 'next/link'
import Image from 'next/image'
import { FacebookIcon, GithubIcon, GlobeIcon, LinkedinIcon, TwitterIcon } from 'lucide-react'

export const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-sec flex items-center justify-center flex-col gap-8">
				<div className="logo">
					<Image src="/img/logo-white.png" alt="logo" width={65} height={65} />
				</div>

				<ul className="flex items-center gap-8">
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
							<TwitterIcon size={20} />
						</Link>
					</li>

					<li>
						<Link href="https://facebook.com/dimochka.sobolev" target="_blank">
							<FacebookIcon size={20} />
						</Link>
					</li>

					<li>
						<Link href="/" target="_blank">
							<GlobeIcon size={20} />
						</Link>
					</li>

					<li>
						<Link href="https://linkedin.com/in/lev-dmitry" target="_blank">
							<LinkedinIcon size={20} />
						</Link>
					</li>

					<li>
						<Link href="https://github.com/19leva89" target="_blank">
							<GithubIcon size={20} />
						</Link>
					</li>
				</ul>

				<div className="copyrights">
					&copy; 2025. All Rights Reserved by <span>Sobolev.in</span>
				</div>
			</div>
		</footer>
	)
}
