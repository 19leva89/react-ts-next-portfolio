'use client'

import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
	ArrowUpRightIcon,
	CalendarDaysIcon,
	DownloadIcon,
	ExternalLinkIcon,
	FacebookIcon,
	GithubIcon,
	GlobeIcon,
	GraduationCapIcon,
	LinkedinIcon,
	MedalIcon,
	TwitterIcon,
} from 'lucide-react'
import { IBlog } from '@/models/blog'
import { services } from '@/constants/services'
import { formatDate } from '@/utils/format-date'
import { ProjectsSection, SkillsGrid, Spinner, TypingAnimation } from '@/components/shared'

const HomePage = () => {
	const { theme } = useTheme()

	const [activeId, setActiveId] = useState<number>(1)
	const [loading, setLoading] = useState<boolean>(true)
	const [allBlogs, setAllBlogs] = useState<IBlog[]>([])

	const handleHover = (id: number) => {
		setActiveId(id)
	}

	const handleMouseOut = () => {
		setActiveId(1)
	}

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const { data } = await axios.get('/api/blogs')

				setAllBlogs(data)
			} catch (error) {
				console.error('[PAGES_HOME] Data fetch error:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchBlogs()
	}, [])

	return (
		<>
			{/* hero section */}
			<section className='hero'>
				<div className='intro-text'>
					<svg viewBox='0 0 1320 300'>
						<text x='50%' y='50%' textAnchor='middle' className='animate-stroke'>
							HI
						</text>
					</svg>
				</div>

				<div className='container m-auto'>
					<div className='flex w-full items-center'>
						{/* left side section */}
						<div className='hero-info-left'>
							<span className='hero-sb-title' data-aos='fade-right'>
								I`m Dmitry
							</span>

							<h1 className='hero-title' data-aos='fade-right'>
								Web Developer +
								<br />
								<TypingAnimation />
							</h1>

							<div
								className='hero_img_box hero-img-box'
								data-aos='flip-left'
								data-aos-easing='ease-out-cubic'
								data-aos-duration='2000'
							>
								<Image
									src={theme === 'light' ? '/img/coder-white.png' : '/img/coder-dark.png'}
									alt='coder'
									height={500}
									width={500}
								/>
							</div>

							<div className='lead' data-aos='fade-up'>
								I break down complex user experience problems to create integrity focused solutions that
								connect millions of people
							</div>

							<div className='hero-btn-box' data-aos='fade-up'>
								<Link
									href='/assets/Soboliev_Dmitry_Node_React_Next_Dev.pdf'
									target='_blank'
									download
									className='download-cv'
								>
									Download CV <DownloadIcon size={24} />
								</Link>

								<ul className='hero-social'>
									<li>
										<Link href='#' target='_blank'>
											<TwitterIcon size={20} />
										</Link>
									</li>

									<li>
										<Link href='https://facebook.com/dimochka.sobolev' target='_blank'>
											<FacebookIcon size={20} />
										</Link>
									</li>

									<li>
										<Link href='#' target='_blank'>
											<GlobeIcon size={20} />
										</Link>
									</li>

									<li>
										<Link href='https://linkedin.com/in/lev-dmitry' target='_blank'>
											<LinkedinIcon size={20} />
										</Link>
									</li>

									<li>
										<Link href='https://github.com/19leva89' target='_blank'>
											<GithubIcon size={20} />
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* right side image section */}
						<div className='hero-image-right'>
							<div
								className='hero_img_box'
								data-aos='flip-left'
								data-aos-easing='ease-out-cubic'
								data-aos-duration='2000'
							>
								<Image
									src={theme === 'light' ? '/img/coder-white.png' : '/img/coder-dark.png'}
									alt='coder'
									height={500}
									width={500}
								/>
							</div>
						</div>
					</div>

					<div className='funfect-area flex items-center justify-between'>
						<div className='funfect-item' data-aos='fade-right'>
							<h3>1+</h3>

							<h4>
								Year of <br /> Experience
							</h4>
						</div>

						<div className='funfect-item' data-aos='fade-right'>
							<h3>18+</h3>

							<h4>
								Projects <br /> Completed
							</h4>
						</div>

						<div className='funfect-item' data-aos='fade-left'>
							<h3>5</h3>

							<h4>
								OpenSource <br /> Library
							</h4>
						</div>

						<div className='funfect-item' data-aos='fade-left'>
							<h3>12+</h3>

							<h4>
								Happy <br /> Customers
							</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Services */}
			<section className='services'>
				<div className='container m-auto'>
					<div className='services-title'>
						<h2 data-aos='fade-up'>My Quality Services</h2>

						<p data-aos='fade-up'>
							I put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className='services-menu' data-aos='fade-up'>
						{services.map((service) => (
							<div
								key={service.id}
								className={`services-item ${activeId === service.id ? 's-active' : ''}`}
								onMouseOver={() => handleHover(service.id)}
								onMouseOut={handleMouseOut}
							>
								<div className='left-s-box'>
									<span>0{service.id}</span>

									<h3>{service.title}</h3>
								</div>

								<div className='right-s-box'>
									<p>{service.description}</p>
								</div>

								<ArrowUpRightIcon size={34} />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Projects */}
			<ProjectsSection showAllProjects={false} maxProjects={4} />

			{/* Experience study */}
			<section className='ex-study'>
				<div className='container m-auto flex items-start justify-between'>
					<div className='experience'>
						<div className='experience-title flex items-center gap-4' data-aos='fade-right'>
							<MedalIcon size={45} />
							<h2>My Experience</h2>
						</div>

						<div className='exper-cards'>
							<div className='exper-card' data-aos='fade-up'>
								<span>2024 - Present</span>
								<h3>DVTech IT Solution</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className='exper-card' data-aos='fade-up'>
								<span>2023 - 2024</span>
								<h3>Bickdrims LLC.</h3>
								<p>Front-end Developer (internship)</p>
							</div>

							<div className='exper-card' data-aos='fade-up'>
								<span>2018 - 2024</span>
								<h3>Bitrek GPS, Kyiv</h3>
								<p>Head of the production department</p>
							</div>

							<div className='exper-card' data-aos='fade-up'>
								<span>2013 - 2018</span>
								<h3>Bitrek GPS, Kyiv</h3>
								<p>Engineer</p>
							</div>
						</div>
					</div>

					<div className='education'>
						<div className='experience-title flex items-center gap-4' data-aos='fade-left'>
							<GraduationCapIcon size={45} />
							<h2>My Education</h2>
						</div>

						<div className='exper-cards'>
							<div className='exper-card' data-aos='fade-up'>
								<span>2023 – 2024</span>

								<Link
									href='https://drive.google.com/file/d/11Qlo5O13dWooep8iPkUuF87e3sCTXrD5/view'
									target='_blank'
									rel='noopener noreferrer'
								>
									<h3 className='flex items-center justify-between gap-4'>
										IT-Brains School <ExternalLinkIcon size={24} />
									</h3>
								</Link>
								<p>Full Stack Developer</p>
							</div>

							<div className='exper-card' data-aos='fade-up'>
								<span>2008 – 2014</span>

								<Link href='https://en.knutd.edu.ua' target='_blank' rel='noopener noreferrer'>
									<h3 className='flex items-center justify-between gap-4'>
										Kyiv National University of Technologies and Design <ExternalLinkIcon size={24} />
									</h3>
								</Link>

								<p>Specialist || Electromechanics</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* My Skills */}
			<SkillsGrid />

			{/* Recent Blogs */}
			<section className='recent-blogs'>
				<div className='container m-auto'>
					<div className='my-skills-title'>
						<h2 data-aos='fade-up'>Recent Blogs</h2>
						<p data-aos='fade-up'>
							I put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className='recent_blogs'>
						{loading ? (
							<div className='flex h-[50vh] w-screen items-center justify-center'>
								<Spinner />
							</div>
						) : (
							<>
								{allBlogs.length === 0 ? (
									<h1 className='mt-12 flex w-full items-center justify-center'>No blogs found</h1>
								) : (
									allBlogs.slice(0, 3).map((blog) => (
										<Link
											key={blog._id}
											href={`/blogs/${blog.slug}`}
											className='re-blog'
											data-aos='flip-left'
											data-aos-easing='ease-out-cubic'
											data-aos-duration='2000'
										>
											<div className='re-blog-img'>
												<Image
													src={blog.images && blog.images.length > 0 ? blog.images[0] : '/img/no-image.png'}
													alt={blog.title}
													width={400}
													height={400}
												/>
												<span>{blog.blogCategory?.[0].replace(/-/g, ' ')}</span>
											</div>

											<div className='re-blog-info'>
												<div className='re-top-date flex items-center gap-4'>
													<CalendarDaysIcon size={16} /> <span>{formatDate(blog.createdAt)}</span>
												</div>

												<h2>{blog.title}</h2>
											</div>
										</Link>
									))
								)}
							</>
						)}
					</div>
				</div>
			</section>
		</>
	)
}

export default HomePage
