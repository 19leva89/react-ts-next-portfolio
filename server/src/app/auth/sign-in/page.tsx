'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { ChangeEvent, useEffect, useState } from 'react'

import { Spinner } from '@/components/shared'

const SignIn = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)
	const [form, setForm] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		setLoading(true)
		e.preventDefault()

		try {
			// attempt to sign in using credentials provider
			const result = await signIn('credentials', {
				redirect: false,
				email: form.email,
				password: form.password,
			})

			if (result && !result.error) {
				// successful sign in
				router.push('/')
			} else {
				setError('Invalid email or password')
				setTimeout(() => setError(''), 3000)
			}
		} catch (error) {
			if (error instanceof Error) {
				setError(`Sign in failed: ${error.message}`)
			} else {
				setError('Sign in failed: unknown error')
			}

			setTimeout(() => setError(''), 3000)
		}
	}

	// authentication
	useEffect(() => {
		if (sessionStatus === 'authenticated') {
			router.push('/')
		}
	}, [sessionStatus, router])

	return (
		<div className="flex items-center justify-center h-screen!">
			<div className="login-form">
				<div className="heading">Sign In</div>

				{loading ? (
					<div className="flex items-center justify-center w-full flex-col">
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

						<button className="login-button" type="submit">
							Sign In
						</button>

						{error && <p className="text-red-500">{error}</p>}
					</form>
				)}
			</div>
		</div>
	)
}

export default SignIn
