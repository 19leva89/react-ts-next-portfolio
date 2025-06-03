'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { Spinner } from '@/components/shared'

const SignInPage = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()

	const [form, setForm] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
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
				toast.success('Sign in successful')

				router.push('/')
			} else {
				toast.error('Invalid email or password')
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`Sign in failed: ${error.message}`)
			} else {
				toast.error('Sign in failed: unknown error')
			}
		}
	}

	return (
		<div className='flex h-screen! items-center justify-center'>
			<div className='login-form'>
				<div className='heading'>Sign In</div>

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

						<button className='login-button' type='submit'>
							Sign In
						</button>

						<span className='text-gray-600'>
							Forgot your password?
							<Link
								href='/recovery'
								className='ml-1 font-medium text-amber-600 transition-colors duration-200 ease-in-out hover:text-amber-700 hover:underline'
							>
								Restore
							</Link>
						</span>
					</form>
				)}
			</div>
		</div>
	)
}

export default SignInPage
