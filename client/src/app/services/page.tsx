import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { CheckIcon, XIcon } from 'lucide-react'

const ServicesPage = () => {
	return (
		<>
			<Head>
				<title>Services</title>
			</Head>

			<div className='services-page'>
				<div className='top-services'>
					<div className='container m-auto'>
						<h2 data-aos='fade-up'>My Services</h2>

						<p data-aos='fade-up'>
							<span>
								I put your ideas and thus your wishes in the form of a unique web project that inspires you
								and you customers
							</span>
						</p>
					</div>
				</div>

				<div className='center-services'>
					<div className='container m-auto'>
						<div className='c-services-box'>
							{/* Web Deployment */}
							<div className='cs-service' data-aos='fade-right'>
								<span>01</span>

								<div>
									<h2>Web Deployment</h2>

									<Image src='/svg/website-icon.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>Performance & Load time</li>
									<li>Reusable Components</li>
									<li>Responsiveness</li>
									<li>Quality assurance and testing</li>
									<li>Ongoing maintenance, updates, and bug fixes</li>
								</ul>

								<p>
									I`m very good in web development offering services. I offer reliable web development
									services to generate the most remarkable results which your business need.
								</p>
							</div>

							{/* Mobile Development */}
							<div className='cs-service' data-aos='fade-right'>
								<span>02</span>

								<div>
									<h2>Mobile Development</h2>

									<Image src='/svg/android.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>Prototyping and Wireframing</li>
									<li>UI/UX Design</li>
									<li>Coding and Programming</li>
									<li>Quality Assurance (QA) Testing</li>
									<li>App Deployment</li>
								</ul>

								<p>
									Experienced mobile developer offering innovative solutions. Proficient in creating
									high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform
									development.
								</p>
							</div>

							{/* Digital Marketing (SEO) */}
							<div className='cs-service' data-aos='fade-up'>
								<span>03</span>

								<div>
									<h2>Digital Marketing (SEO)</h2>

									<Image src='/svg/seo.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>Marketing Strategy</li>
									<li>Research On Customer</li>
									<li>Monetize Products</li>
								</ul>

								<p>
									My digital marketing services will take your business to the next level, we offer remarkable
									digital marketing strategies that drives traffic to your website, your business, and
									improves your brand awareness to potential customers.
								</p>
							</div>

							{/* Content Creator */}
							<div className='cs-service' data-aos='fade-up'>
								<span>04</span>

								<div>
									<h2>Content Creator</h2>

									<Image src='/svg/photo-album.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>Crispy Digital Editing</li>
									<li>Marketing and Promotion on Social Platforms</li>
									<li>Client communication skill</li>
								</ul>

								<p>
									Passionate photographer and videographer capturing moments with creativity. Transforming
									visions into visual stories. Expert in visual storytelling, skilled in both photography and
									videography to deliver captivating content.
								</p>
							</div>

							{/* UI/UX Product Design */}
							<div className='cs-service' data-aos='fade-left'>
								<span>05</span>

								<div>
									<h2>UI/UX Product Design</h2>

									<Image src='/svg/ui.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>Reusable Components</li>
									<li>Responsiveness</li>
									<li>Quality assurance and testing</li>
									<li>UI/UX Design</li>
								</ul>

								<p>
									I am very good in web development offering services, I offer reliable web development
									services to generate the most remarkable results which your business need.
								</p>
							</div>

							{/* E-commerce Business Solutions */}
							<div className='cs-service' data-aos='fade-left'>
								<span>06</span>

								<div>
									<h2>E-commerce Business Solutions</h2>

									<Image src='/svg/shopify.svg' alt='' width={70} height={70} />
								</div>

								<ul>
									<li>E-Commerce store</li>
									<li>Online Purchase</li>
									<li>Quality assurance and testing</li>
									<li>Marketing and Promotion on Social Platforms</li>
								</ul>

								<p>
									My digital marketing services will take your business to the next level, we offer remarkable
									digital marketing strategies that drives traffic to your website, your business, and
									improves your brand awareness to potential customers.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className='pricing-plan-sec'>
					<div className='container m-auto'>
						<div className='pricing-title text-center'>
							<h3 data-aos='fade-up' className='flex items-center justify-center gap-2'>
								<Image src='/img/chevron-right.png' alt='' width={45} height={20} /> Pricing Plan
							</h3>

							<h2 data-aos='fade-up'>Pricing my work</h2>
						</div>

						<div className='mx-4 flex flex-wrap items-center justify-center gap-12 md:justify-between'>
							{/* Life Plan */}
							<div className='pricing-card' data-aos='fade-right'>
								<h4>Life Plan</h4>

								<p>Perfect choice for individual</p>

								<h2>
									$29.00 <span>Monthly</span>
								</h2>

								<Link href='/contacts'>
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Lite includes:</h5>

									<ul>
										<li>
											<CheckIcon size={20} /> Powerful admin panel
										</li>

										<li>
											<CheckIcon size={20} /> 1 Native android app
										</li>

										<li>
											<XIcon size={20} /> Multi-language support
										</li>

										<li>
											<XIcon size={20} /> 24/7 support
										</li>
									</ul>
								</div>
							</div>

							{/* Premium Plan */}
							<div className='pricing-card' data-aos='fade-up'>
								<h4>Premium Plan</h4>

								<p>Perfect choice for individual</p>

								<h2>
									$59.00 <span>Monthly</span>
								</h2>

								<Link href='/contacts'>
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Everything in Lite, plus:</h5>

									<ul>
										<li>
											<CheckIcon size={20} /> Powerful admin panel
										</li>

										<li>
											<CheckIcon size={20} /> 1 Native android app
										</li>

										<li>
											<CheckIcon size={20} /> Multi-language support
										</li>

										<li>
											<XIcon size={20} /> 24/7 support
										</li>
									</ul>
								</div>
							</div>

							{/* Pro Plan */}
							<div className='pricing-card' data-aos='fade-left'>
								<h4>Pro Plan</h4>

								<p>Perfect choice for individual</p>

								<h2>
									$79.00 <span>Monthly</span>
								</h2>

								<Link href='/contacts'>
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Everything in Premium, plus:</h5>

									<ul>
										<li>
											<CheckIcon size={20} /> Powerful admin panel
										</li>

										<li>
											<CheckIcon size={20} /> 1 Native android app
										</li>

										<li>
											<CheckIcon size={20} /> Multi-language support
										</li>

										<li>
											<CheckIcon size={20} /> 24/7 support
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ServicesPage
