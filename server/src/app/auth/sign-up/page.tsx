'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { Spinner } from '@/components/shared'

const SignUp = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()

	const [error, setError] = useState<string | null>(null)
	const [form, setForm] = useState<{ email: string; password: string; confirmPassword: string }>({
		email: '',
		password: '',
		confirmPassword: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (form.password !== form.confirmPassword) {
			setError('Passwords do not match')
			setTimeout(() => setError(''), 3000)

			return
		}

		const { data } = await axios.post('/api/auth/sign-up', form, {
			headers: { 'Content-Type': 'application/json' },
		})

		if (data.error) {
			setError('Error happened here')

			setTimeout(() => setError(''), 3000)
		} else {
			router.push('/auth/sign-in')
		}
	}

	// authentication
	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			router.push('/')
		}
	}, [sessionStatus, router])

	return (
		<div className="flex flex-center full-h">
			<div className="login-form">
				<div className="heading">Sign Up create admin</div>

				{sessionStatus === 'loading' ? (
					<div className="flex flex-center w-100 flex-col">
						<Spinner />
					</div>
				) : (
					<form className="form" onSubmit={handleSubmit}>
						<input
							type="email"
							name="email"
							placeholder="Email"
							className="input"
							onChange={handleChange}
							value={form.email}
							required
						/>

						<input
							type="password"
							name="password"
							placeholder="Password"
							className="input"
							onChange={handleChange}
							value={form.password}
							required
						/>

						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm password"
							className="input"
							onChange={handleChange}
							value={form.confirmPassword}
							required
						/>

						<button className="login-button" type="submit">
							Sign Up
						</button>

						{error && <p className="red-color">{error}</p>}
					</form>
				)}

				<span className="agreement">
					<a href="/" target="_blank" rel="noopener noreferrer">
						Learn admin license agreement
					</a>
				</span>
			</div>
		</div>
	)
}

export default SignUp
