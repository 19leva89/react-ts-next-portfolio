'use client'

import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import { LinkedinIcon, MailIcon, PhoneCallIcon, TwitterIcon } from 'lucide-react'

import { IContact } from '@/models/contact'

const ContactPage = () => {
	const [firstName, setFirstName] = useState<string>('')
	const [lastName, setLastName] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [company, setCompany] = useState<string>('')
	const [phone, setPhone] = useState<string>('')
	const [country, setCountry] = useState<string>('')
	const [project, setProject] = useState<string[]>([])
	const [price, setPrice] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	const [messageOk, setMessageOk] = useState<string>('')

	const createProduct = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setMessageOk('Sending...')

		const data: IContact = {
			_id: '',
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
			setProject([])
			setPrice('')
			setDescription('')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.error('[CONTACTS_RES] Error sending data:', error.response.data)
				} else if (error.request) {
					console.error('[CONTACTS_REQ] Error sending data:', error.request)
				} else {
					console.error('[CONTACTS_ERR] Error sending data:', error.message)
				}
			} else {
				console.error('[CONTACTS_UNK] An unknown error occurred:', (error as Error).message)
			}

			setMessageOk('❌ Something went wrong')
		}
	}

	const handleProjectChange = (projectName: string) => {
		if (project.includes(projectName)) {
			setProject(project.filter((item) => item !== projectName))
		} else {
			setProject([...project, projectName])
		}
	}

	const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value)
	}

	return (
		<>
			<Head>
				<title>Contact us</title>
			</Head>

			<div className='contact-page'>
				<div className='container m-auto'>
					<div className='contact-form-p'>
						<div className='left-cont-p' data-aos='fade-right'>
							<h2>Get in touch</h2>

							<h2>Let`s talk about your project</h2>

							<p>Thinking about a new project, a problem to solve, or just want to connect? Let`s do it!</p>

							<p>Use the form on this page or get in touch by other means.</p>

							<p>We love question and feedback - and we`re happy to help!</p>

							<div className='left-soc-info'>
								<ul>
									<li>
										<PhoneCallIcon size={26} />

										<span>
											Phone:{' '}
											<Link href='tel:+380668745656' target='_blank' rel='noopener noreferrer'>
												+380668745656
											</Link>
										</span>
									</li>

									<li>
										<MailIcon size={26} />

										<span>
											Email:{' '}
											<Link href='mailto:d.sobolev.dev@gmail.com' target='_blank' rel='noopener noreferrer'>
												d.sobolev.dev@gmail.com
											</Link>
										</span>
									</li>

									<li>
										<LinkedinIcon size={26} />

										<span>
											LinkedIn:{' '}
											<Link
												href='https://linkedin.com/in/lev-dmitry'
												target='_blank'
												rel='noopener noreferrer'
											>
												lev dmitry
											</Link>
										</span>
									</li>

									<li>
										<TwitterIcon size={26} />

										<span>
											Twitter:{' '}
											<Link href='#' target='_blank' rel='noopener noreferrer'>
												@sobolev
											</Link>
										</span>
									</li>
								</ul>
							</div>
						</div>

						<div className='right-cont-p' data-aos='fade-left'>
							<form onSubmit={createProduct}>
								<div className='right-cont-title'>
									<h2>Your Contact information</h2>
								</div>

								<div className='right-cont-input'>
									<input
										type='text'
										placeholder='First Name'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
									/>

									<input
										type='text'
										placeholder='Last Name'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>

									<input
										type='email'
										placeholder='Email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>

									<input
										type='text'
										placeholder='Company name'
										value={company}
										onChange={(e) => setCompany(e.target.value)}
										required
									/>

									<input
										type='tel'
										placeholder='Phone number'
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										required
									/>

									<select
										name='country'
										id='country'
										value={country}
										onChange={(e) => setCountry(e.target.value)}
									>
										<option value=''>Select country</option>
										<option value='czech-republic'>Czech Republic</option>
										<option value='france'>France</option>
										<option value='germany'>Germany</option>
										<option value='greece'>Greece</option>
										<option value='hungary'>Hungary</option>
										<option value='italy'>Italy</option>
										<option value='norway'>Norway</option>
										<option value='poland'>Poland</option>
										<option value='spain'>Spain</option>
										<option value='sweden'>Sweden</option>
										<option value='turkiye'>Türkiye</option>
										<option value='ukraine'>Ukraine</option>
										<option value='united-kingdom'>United Kingdom</option>
										<option value='united-states'>United States</option>
									</select>
								</div>

								<div className='right-cont-title'>
									<h2>What services do you need for your project?</h2>
								</div>

								<div className='right-cont-checkbox'>
									{[
										'Website Development',
										'App Development',
										'Design System',
										'Website Migration',
										'E-commerce Site',
										'Performance Evaluation',
									].map((item) => (
										<label key={item} className='cyberpunk-checkbox-label'>
											<input
												type='checkbox'
												value={item}
												onChange={() => handleProjectChange(item)}
												className='cyberpunk-checkbox'
											/>

											{item}
										</label>
									))}
								</div>

								<div className='right-cont-title'>
									<h2>How much is the anticipated budget for your next project?</h2>
								</div>

								<div className='right-cont-radio'>
									{['Less than $400', '$400 - $800', '$800 - $1000', 'More than $1000'].map((priceRange) => (
										<label key={priceRange} htmlFor={priceRange} className='radio-button'>
											<input
												id={priceRange}
												type='radio'
												name='budget'
												value={priceRange}
												checked={price === priceRange}
												onChange={handlePriceChange}
											/>

											<span className='radio'></span>
											{priceRange}
										</label>
									))}
								</div>

								<div className='right-cont-title'>
									<h2>Tell me about your project</h2>
								</div>

								<div className='right-cont-pera'>
									<textarea
										name='description'
										id='description'
										rows={4}
										placeholder='Tell me about your project'
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>

								<hr />

								<div className='right-cont-btn flex items-center gap-12'>
									<button type='submit'>Submit</button>

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

export default ContactPage
