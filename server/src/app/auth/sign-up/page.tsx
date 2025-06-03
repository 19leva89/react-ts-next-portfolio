'use client'

import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'

import { Spinner } from '@/components/shared'

const SignUpPage = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()

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
			toast.error('Passwords do not match')
			// setError('Passwords do not match')
			// setTimeout(() => setError(''), 3000)

			return
		}

		const { data } = await axios.post('/api/auth/sign-up', form, {
			headers: { 'Content-Type': 'application/json' },
		})

		if (data.error) {
			toast.error('Error happened here')
			// setError('Error happened here')

			// setTimeout(() => setError(''), 3000)
		} else {
			toast.success('Sign up successful')

			router.push('/auth/sign-in')
		}
	}

	return (
		<div className='flex h-screen! items-center justify-center'>
			<div className='login-form'>
				<div className='heading'>Sign Up create admin</div>

				{sessionStatus === 'loading' ? (
					<div className='flex w-full flex-col items-center justify-center'>
						<Spinner />
					</div>
				) : (
					<form className='form' onSubmit={handleSubmit}>
						<input
							type='email'
							name='email'
							placeholder='Email'
							className='input'
							onChange={handleChange}
							value={form.email}
							required
						/>

						<input
							type='password'
							name='password'
							placeholder='Password'
							className='input'
							onChange={handleChange}
							value={form.password}
							required
						/>

						<input
							type='password'
							name='confirmPassword'
							placeholder='Confirm password'
							className='input'
							onChange={handleChange}
							value={form.confirmPassword}
							required
						/>

						<button className='login-button' type='submit'>
							Sign Up
						</button>

						<span className='text-gray-600'>
							Already have an account?
							<Link
								href='/auth/sign-in'
								className='ml-1 font-medium text-amber-600 transition-colors duration-200 ease-in-out hover:text-amber-700 hover:underline'
							>
								Login
							</Link>
						</span>
					</form>
				)}

				<span className='agreement'>
					<a href='/' target='_blank' rel='noopener noreferrer'>
						Learn admin license agreement
					</a>
				</span>
			</div>
		</div>
	)
}

export default SignUpPage
