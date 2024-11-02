import Head from 'next/head'
import Link from 'next/link'

import { HiXMark } from 'react-icons/hi2'
import { IoMdCheckmark } from 'react-icons/io'

const Services = () => {
	return (
		<>
			<Head>
				<title>Services</title>
			</Head>

			<div className="services-page">
				<div className="top-services">
					<div className="container">
						<h2 data-aos="fade-up">Sobolev Services</h2>

						<p data-aos="fade-up">
							Home <span>&gt;</span> Services
						</p>
					</div>
				</div>

				<div className="center-services">
					<div className="container">
						<div className="c-services-box">
							{/* Web Deployment */}
							<div className="cs-service" data-aos="fade-right">
								<span>01</span>

								<div>
									<h2>Web Deployment</h2>

									<img src="/svg/website-icon.svg" alt="" />
								</div>

								<ul>
									<li>Performance & Load time</li>
									<li>Reusable Components</li>
									<li>Responssiveness</li>
									<li>Quality assurance and testing</li>
									<li>Ongoing maintenance, updates, and bug fixes</li>
								</ul>

								<p>
									I`m very good in web development offering services. I offer reliable web development
									services to generate the most remarkable results which your business need.
								</p>
							</div>

							{/* Mobile Development */}
							<div className="cs-service" data-aos="fade-right">
								<span>02</span>

								<div>
									<h2>Mobile Development</h2>

									<img src="/svg/android.svg" alt="" />
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
							<div className="cs-service" data-aos="fade-up">
								<span>03</span>

								<div>
									<h2>Digital Marketing (SEO)</h2>

									<img src="/svg/seo.svg" alt="" />
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
							<div className="cs-service" data-aos="fade-up">
								<span>04</span>

								<div>
									<h2>Content Creator</h2>

									<img src="/svg/photo-album.svg" alt="" />
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
							<div className="cs-service" data-aos="fade-left">
								<span>05</span>

								<div>
									<h2>UI/UX Product Design</h2>

									<img src="/svg/ui.svg" alt="" />
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
							<div className="cs-service" data-aos="fade-left">
								<span>06</span>

								<div>
									<h2>E-commerce Business Solutions</h2>

									<img src="/svg/shopify.svg" alt="" />
								</div>

								<ul>
									<li>Ecommerce store</li>
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

				<div className="pricing-plan-sec">
					<div className="container">
						<div className="pricing-title text-center">
							<h3 data-aos="fade-up">
								<img src="/img/chevron-right.png" alt="" /> Pricing Plan
							</h3>

							<h2 data-aos="fade-up">Pricing my work</h2>
						</div>

						<div className="pricing-cards">
							{/* Life Plan */}
							<div className="pricing-card" data-aos="fade-right">
								<h4>Life Plan</h4>

								<p>Perfect choise for individual</p>

								<h2>
									$29.00 <span>Monthly</span>
								</h2>

								<Link href="/contacts">
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Lite includes:</h5>

									<ul>
										<li>
											<IoMdCheckmark /> Powerful admin panel
										</li>

										<li>
											<IoMdCheckmark /> 1 Native android app
										</li>

										<li>
											<HiXMark /> Multi-language support
										</li>

										<li>
											<HiXMark /> 24/7 support
										</li>
									</ul>
								</div>
							</div>

							{/* Premium Plan */}
							<div className="pricing-card" data-aos="fade-up">
								<h4>Premium Plan</h4>

								<p>Perfect choise for individual</p>

								<h2>
									$59.00 <span>Monthly</span>
								</h2>

								<Link href="/contacts">
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Everything in Lite, plus:</h5>

									<ul>
										<li>
											<IoMdCheckmark /> Powerful admin panel
										</li>

										<li>
											<IoMdCheckmark /> 1 Native android app
										</li>

										<li>
											<IoMdCheckmark /> Multi-language support
										</li>

										<li>
											<HiXMark /> 24/7 support
										</li>
									</ul>
								</div>
							</div>

							{/* Pro Plan */}
							<div className="pricing-card" data-aos="fade-left">
								<h4>Pro Plan</h4>

								<p>Perfect choise for individual</p>

								<h2>
									$79.00 <span>Monthly</span>
								</h2>

								<Link href="/contacts">
									<button>Get Start Now</button>
								</Link>

								<div>
									<h5>Everything in Premium, plus:</h5>

									<ul>
										<li>
											<IoMdCheckmark /> Powerful admin panel
										</li>

										<li>
											<IoMdCheckmark /> 1 Native android app
										</li>

										<li>
											<IoMdCheckmark /> Multi-language support
										</li>

										<li>
											<IoMdCheckmark /> 24/7 support
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

export default Services
