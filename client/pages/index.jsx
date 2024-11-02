import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { services } from '@/constants/services'
import { formatDate } from '@/utils/format-date'
import { Spinner, TypingAnimation } from '@/components'

import { LuMedal } from 'react-icons/lu'
import { BiDownload } from 'react-icons/bi'
import { GoArrowUpRight } from 'react-icons/go'
import { PiGraduationCap } from 'react-icons/pi'
import { GrLinkedinOption } from 'react-icons/gr'
import { LiaBasketballBallSolid } from 'react-icons/lia'
import { FaCalendarDays, FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa6'

const Home = () => {
	const [activeId, setActiveId] = useState(1)
	const [loading, setLoading] = useState(true)
	const [allProjects, setAllProjects] = useState([])
	const [allBlogs, setAllBlogs] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [filtredProjects, setFiltredProjects] = useState([])

	const handleHover = (id) => {
		setActiveId(id)
	}

	const handleMouseOut = () => {
		setActiveId(1)
	}

	const handleCategoryChange = (category) => {
		setSelectedCategory(category)
	}

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [projectsResponse, blogsResponse] = await Promise.all([
					axios.get('/api/projects'),
					axios.get('/api/blogs'),
				])

				setAllProjects(projectsResponse.data)
				setAllBlogs(blogsResponse.data)
			} catch (error) {
				console.error('[PAGES_HOME] Data fetch error:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchAllData()
	}, [])

	useEffect(() => {
		// filter projects based on selected category
		if (selectedCategory === 'all') {
			setFiltredProjects(allProjects.filter((project) => project.status === 'publish'))
		} else {
			setFiltredProjects(
				allProjects.filter(
					(project) => project.status === 'publish' && project.projectCategory[0] === selectedCategory,
				),
			)
		}
	}, [selectedCategory, allProjects])

	return (
		<>
			<Head>
				<title>Sobolev - Personal Portfolio</title>
				<meta name="description" content="Sobolev - Personal Portfolio" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" type="image/png" href="/favicon.png" />
			</Head>

			{/* hero section */}
			<section className="hero">
				<div className="intro-text">
					<svg viewBox="0 0 1320 300">
						<text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
							HI
						</text>
					</svg>
				</div>

				<div className="container">
					<div className="flex w-100">
						{/* left side section */}
						<div className="hero-info-left">
							<span className="hero-sb-title" data-aos="fade-right">
								I'm Dmitry
							</span>

							<h1 className="hero-title" data-aos="fade-right">
								Web Developer +
								<br />
								<TypingAnimation />
							</h1>

							<div
								className="hero_img_box hero-img-box"
								data-aos="flip-left"
								data-aos-easing="ease-out-cubic"
								data-aos-duration="2000"
							>
								<img src="/img/me.png" alt="coder" />
							</div>

							<div className="lead" data-aos="fade-up">
								I break down complex user experience problems to create integrity focused solutions that
								connect billions of people
							</div>

							<div className="hero-btn-box" data-aos="fade-up">
								<Link href="/assets/cv.pdf" target="_blank" download className="download-cv">
									Download CV <BiDownload />
								</Link>

								<ul className="hero-social">
									<li>
										<Link href="#" target="_blank">
											<FaTwitter />
										</Link>
									</li>

									<li>
										<Link href="https://www.facebook.com/dimochka.sobolev" target="_blank">
											<FaFacebookF />
										</Link>
									</li>

									<li>
										<Link href="#" target="_blank">
											<LiaBasketballBallSolid />
										</Link>
									</li>

									<li>
										<Link href="https://www.linkedin.com/in/lev-dmitry" target="_blank">
											<GrLinkedinOption />
										</Link>
									</li>

									<li>
										<Link href="https://github.com/19leva89" target="_blank">
											<FaGithub />
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* right side image section */}
						<div className="hero-image-right">
							<div
								className="hero_img_box"
								data-aos="flip-left"
								data-aos-easing="ease-out-cubic"
								data-aos-duration="2000"
							>
								<img src="/img/me.png" alt="coder" />
							</div>
						</div>
					</div>

					<div className="funfect-area flex flex-sb">
						<div className="funfect-item" data-aos="fade-right">
							<h3>1+</h3>

							<h4>
								Year of <br /> Experience
							</h4>
						</div>

						<div className="funfect-item" data-aos="fade-right">
							<h3>18+</h3>

							<h4>
								Projects <br /> Completed
							</h4>
						</div>

						<div className="funfect-item" data-aos="fade-left">
							<h3>5</h3>

							<h4>
								OpenSource <br /> Library
							</h4>
						</div>

						<div className="funfect-item" data-aos="fade-left">
							<h3>12+</h3>

							<h4>
								Happy <br /> Customers
							</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Services */}
			<section className="services">
				<div className="container">
					<div className="services-title">
						<h2 data-aos="fade-up">My Quality Services</h2>

						<p data-aos="fade-up">
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="services-menu" data-aos="fade-up">
						{services.map((service) => (
							<div
								key={service.id}
								className={`services-item ${activeId === service.id ? 's-active' : ''}`}
								onMouseOver={() => handleHover(service.id)}
								onMouseOut={handleMouseOut}
							>
								<div className="left-s-box">
									<span>0{service.id}</span>

									<h3>{service.title}</h3>
								</div>

								<div className="right-s-box">
									<p>{service.description}</p>
								</div>

								<GoArrowUpRight />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Projects */}
			<section className="projects">
				<div className="container">
					<div className="projects-title">
						<h2 data-aos="fade-up">My Recent Works</h2>

						<p data-aos="fade-up">
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div
						className="projects-button"
						data-aos="fade-zoom-in"
						data-aos-easing="ease-in-back"
						data-aos-delay="300"
						data-aos-offset="0"
					>
						<button
							className={selectedCategory === 'all' ? 'active' : ''}
							onClick={() => setSelectedCategory('all')}
						>
							All
						</button>

						<button
							className={selectedCategory === 'website-development' ? 'active' : ''}
							onClick={() => setSelectedCategory('website-development')}
						>
							Website
						</button>

						<button
							className={selectedCategory === 'app-development' ? 'active' : ''}
							onClick={() => setSelectedCategory('app-development')}
						>
							Apps
						</button>

						<button
							className={selectedCategory === 'design-system' ? 'active' : ''}
							onClick={() => setSelectedCategory('design-system')}
						>
							Design
						</button>

						<button
							className={selectedCategory === 'website-migration' ? 'active' : ''}
							onClick={() => setSelectedCategory('website-migration')}
						>
							Migration
						</button>

						<button
							className={selectedCategory === 'e-commerce-site' ? 'active' : ''}
							onClick={() => setSelectedCategory('e-commerce-site')}
						>
							E-commerce
						</button>

						<button
							className={selectedCategory === 'performance-evaluation' ? 'active' : ''}
							onClick={() => setSelectedCategory('performance-evaluation')}
						>
							Performance
						</button>
					</div>

					<div className="projects-card">
						{loading ? (
							<div className="flex flex-center wh_50">
								<Spinner />
							</div>
						) : (
							<>
								{filtredProjects.length === 0 ? (
									<h1 className="flex flex-center w-100 mt-3">No projects found</h1>
								) : (
									filtredProjects.slice(0, 4).map((project) => (
										<Link
											key={project._id}
											href={`/projects/${project.slug}`}
											className="pro-card"
											data-aos="flip-left"
											data-aos-easing="ease-out-cubic"
											data-aos-duration="2000"
										>
											<div className="pro-img-box">
												<img src={project.images[0] || '/img/no-image.png'} alt={project.title} />
											</div>

											<div className="pro-content-box">
												<h2>{project.title}</h2>

												<GoArrowUpRight />
											</div>
										</Link>
									))
								)}
							</>
						)}
					</div>
				</div>
			</section>

			{/* Experience study */}
			<section className="ex-study">
				<div className="container flex flex-left flex-sb">
					<div className="experience">
						<div className="experience-title flex gap-1" data-aos="fade-right">
							<LuMedal />
							<h2>My Experience</h2>
						</div>

						<div className="exper-cards">
							<div className="exper-card" data-aos="fade-up">
								<span>2020 - Present</span>
								<h3>DVTech IT Solution</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2018 - 2020</span>
								<h3>Bickdrims LLC.</h3>
								<p>Front-end Developer (internship)</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2021 - 2023</span>
								<h3>Vagally LLC.</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2021 - 2024</span>
								<h3>BlokDots, USA</h3>
								<p>Full Stack Developer</p>
							</div>
						</div>
					</div>

					<div className="education">
						<div className="experience-title flex gap-1" data-aos="fade-left">
							<PiGraduationCap />
							<h2>My Education</h2>
						</div>

						<div className="exper-cards">
							<div className="exper-card" data-aos="fade-up">
								<span>2020 - Present</span>
								<h3>DVTech IT Solution</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2018 - 2020</span>
								<h3>Bickdrims LLC.</h3>
								<p>Front-end Developer (internship)</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2021 - 2023</span>
								<h3>Vagally LLC.</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card" data-aos="fade-up">
								<span>2021 - 2024</span>
								<h3>BlokDots, USA</h3>
								<p>Full Stack Developer</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* My Skills */}
			<section className="my-skills">
				<div className="container">
					<div className="my-skills-title">
						<h2 data-aos="fade-up">My Skills</h2>
						<p data-aos="fade-up">
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="my-skills-cards">
						<div className="my-s-card" data-aos="fade-right">
							<div className="my-s-inner">
								<img src="/svg/python.svg" alt="python" />
								<h3>92%</h3>
							</div>

							<p className="text-center">Python</p>
						</div>

						<div className="my-s-card" data-aos="fade-right">
							<div className="my-s-inner">
								<img src="/svg/firebase.svg" alt="firebase" />
								<h3>80%</h3>
							</div>

							<p className="text-center">Firebase</p>
						</div>

						<div className="my-s-card" data-aos="fade-right">
							<div className="my-s-inner">
								<img src="/svg/mongo-db.svg" alt="mongodb" />
								<h3>98%</h3>
							</div>

							<p className="text-center">MongoDB</p>
						</div>

						<div className="my-s-card" data-aos="fade-left">
							<div className="my-s-inner">
								<img src="/svg/redux.svg" alt="redux" />
								<h3>85%</h3>
							</div>

							<p className="text-center">Redux</p>
						</div>

						<div className="my-s-card" data-aos="fade-left">
							<div className="my-s-inner">
								<img src="/svg/react.svg" alt="react" />
								<h3>99%</h3>
							</div>

							<p className="text-center">React</p>
						</div>

						<div className="my-s-card" data-aos="fade-left">
							<div className="my-s-inner">
								<img src="/svg/js.svg" alt="java-script" />
								<h3>99%</h3>
							</div>

							<p className="text-center">JavaScript</p>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Blogs */}
			<section className="recent-blogs">
				<div className="container">
					<div className="my-skills-title">
						<h2 data-aos="fade-up">Recent Blogs</h2>
						<p data-aos="fade-up">
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="recent_blogs">
						{loading ? (
							<div className="flex flex-center wh_50">
								<Spinner />
							</div>
						) : (
							<>
								{allBlogs.length === 0 ? (
									<h1 className="flex flex-center w-100 mt-3">No blogs found</h1>
								) : (
									allBlogs.slice(0, 3).map((blog) => (
										<Link
											key={blog._id}
											href={`/blogs/${blog.slug}`}
											className="re-blog"
											data-aos="flip-left"
											data-aos-easing="ease-out-cubic"
											data-aos-duration="2000"
										>
											<div className="re-blog-img">
												<img src={blog.images[0] || '/img/no-image.png'} alt={blog.title} />
												<span>{blog.blogCategory[0].replace(/-/g, ' ')}</span>
											</div>

											<div className="re-blog-info">
												<div className="re-top-date flex gap-1">
													<FaCalendarDays /> <span>{formatDate(new Date(blog.createdAt))}</span>
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

export default Home
