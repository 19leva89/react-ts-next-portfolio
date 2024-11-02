import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { GrLinkedin } from 'react-icons/gr'
import { MdAttachEmail } from 'react-icons/md'
import { FaPhoneVolume, FaTwitter } from 'react-icons/fa6'

const Contact = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [company, setCompany] = useState('')
	const [phone, setPhone] = useState('')
	const [country, setCountry] = useState('')
	const [project, setProject] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')

	const [messageOk, setMessageOk] = useState('')

	const createProduct = async (e) => {
		e.preventDefault()

		setMessageOk('Sending...')

		const data = {
			firstName,
			lastName,
			email,
			company,
			phone,
			country,
			project,
			price,
			description,
		}

		try {
			await axios.post('/api/contacts', data)

			setMessageOk('✅ Your message has been sent successfully')

			setFirstName('')
			setLastName('')
			setEmail('')
			setCompany('')
			setPhone('')
			setCountry('')
			setProject('')
			setPrice('')
			setDescription('')
		} catch (error) {
			if (error.response) {
				console.error('[CONTACTS_RES] Error sending data:', error.response.data)
			} else if (error.request) {
				console.error('[CONTACTS_REQ] Error sending data:', error.request)
			} else {
				console.error('[CONTACTS_ERR] Error sending data:', error.message)
			}

			setMessageOk('❌ Something went wrong')
		}
	}

	const handleProjectChange = (projectName) => {
		if (project.includes(projectName)) {
			setProject(project.filter((item) => item !== projectName))
		} else {
			setProject([...project, projectName])
		}
	}

	const handlePriceChange = (e) => {
		setPrice(e.target.value)
	}

	return (
		<>
			<Head>
				<title>Contact us</title>
			</Head>

			<div className="contact-page">
				<div className="container">
					<div className="contact-form-p">
						<div className="left-cont-p" data-aos="fade-right">
							<h2>Get in touch</h2>

							<h2>Let`s talk about your project</h2>

							<p>Thinking about a new project, a problem to solve, or just want to connect? Let`s do it!</p>

							<p>Use the form on this page or get in touch by other means.</p>

							<p>We love question and feedback - and we`re happy to help!</p>

							<div className="left-soc-info">
								<ul>
									<li>
										<FaPhoneVolume />

										<span>
											Phone:{' '}
											<Link href="tel:+380668745656" target="_blank" rel="noreferrer noopener">
												+380668745656
											</Link>
										</span>
									</li>

									<li>
										<MdAttachEmail />

										<span>
											Email:{' '}
											<Link href="mailto:d.sobolev.dev@gmail.com" target="_blank" rel="noreferrer noopener">
												d.sobolev.dev@gmail.com
											</Link>
										</span>
									</li>

									<li>
										<GrLinkedin />

										<span>
											LinkedIn:{' '}
											<Link
												href="https://www.linkedin.com/in/lev-dmitry"
												target="_blank"
												rel="noreferrer noopener"
											>
												lev dmitry
											</Link>
										</span>
									</li>

									<li>
										<FaTwitter />

										<span>
											Twitter:{' '}
											<Link href="#" target="_blank" rel="noreferrer noopener">
												@sobolev
											</Link>
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className="right-cont-p" data-aos="fade-left">
							<form onSubmit={createProduct}>
								<div className="right-cont-title">
									<h2>Your Contact information</h2>
								</div>

								<div className="right-cont-input">
									<input
										type="text"
										placeholder="First Name"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
									/>

									<input
										type="text"
										placeholder="Last Name"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>

									<input
										type="email"
										placeholder="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>

									<input
										type="text"
										placeholder="Company name"
										value={company}
										onChange={(e) => setCompany(e.target.value)}
										required
									/>

									<input
										type="tel"
										placeholder="Phone number"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
									/>

									<select
										name="country"
										id="country"
										value={country}
										onChange={(e) => setCountry(e.target.value)}
									>
										<option value="">Select country</option>
										<option value="USA">USA</option>
										<option value="UK">UK</option>
										<option value="Germany">Germany</option>
										<option value="France">France</option>
									</select>
								</div>

								<div className="right-cont-title">
									<h2>What services do you need for your project?</h2>
								</div>

								<div className="right-cont-checkbox">
									{[
										'Website Development',
										'App Development',
										'Design System',
										'Website Migration',
										'E-commerce Site',
										'Performance Evaluation',
									].map((item) => (
										<label key={item} className="cyberpunk-checkbox-label">
											<input
												type="checkbox"
												value={item}
												onChange={() => handleProjectChange(item)}
												className="cyberpunk-checkbox"
											/>

											{item}
										</label>
									))}
								</div>

								<div className="right-cont-title">
									<h2>How much is the anticipated budget for your next project?</h2>
								</div>

								<div className="right-cont-radio">
									{['Less than $400', '$400 - $800', '$800 - $1000', 'More than $1000'].map((priceRange) => (
										<div key={priceRange} className="radio-button">
											<input
												type="radio"
												id={priceRange}
												name="budget"
												value={priceRange}
												checked={price === priceRange}
												onChange={handlePriceChange}
											/>

											<span className="radio"></span>

											<label htmlFor={priceRange}>{priceRange}</label>
										</div>
									))}
								</div>

								<div className="right-cont-title">
									<h2>Tell me about your project</h2>
								</div>

								<div className="right-cont-pera">
									<textarea
										name="description"
										id="description"
										rows={4}
										placeholder="Tell me about your project"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>

								<hr />

								<div className="right-cont-btn flex gap-3">
									<button type="submit">Submit</button>

									<p>{messageOk}</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Contact
