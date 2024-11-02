'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { Spinner } from '@/components'

const SignIn = () => {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [form, setForm] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()

		try {
			// attempt to sign in using credentials provider
			const result = await signIn('credentials', {
				redirect: false,
				email: form.email,
				password: form.password,
			})

			if (!result.error) {
				// successful sign in
				router.push('/')
			} else {
				setError('Invalid email or password')
				setTimeout(() => setError(''), 3000)
			}
		} catch (error) {
			setError('Sign in failed, please try again')
			setTimeout(() => setError(''), 3000)
		} finally {
			setLoading(false)
			setTimeout(() => setError(''), 3000)
		}
	}

	// authentication
	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])

	return (
		<div className="flex flex-center full-h">
			<div className="login-form">
				<div className="heading">Sign In</div>

				{loading ? (
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
						/>

						<input
							type="password"
							name="password"
							placeholder="Password"
							className="input"
							onChange={handleChange}
							value={form.password}
						/>

						<button className="login-button" type="submit">
							Sign In
						</button>

						{error && <p className="red-color">{error}</p>}
					</form>
				)}
			</div>
		</div>
	)
}

export default SignIn
