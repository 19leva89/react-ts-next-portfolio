'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { Button } from '@repo/ui/components'
import { Spinner } from '@/components/shared'

const SignInPage = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [form, setForm] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

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
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='h-screen! flex items-center justify-center'>
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
							onChange={handleChange}
							value={form.email}
							disabled={isLoading}
							className='input'
							required
						/>

						<input
							type='password'
							name='password'
							placeholder='Password'
							onChange={handleChange}
							value={form.password}
							disabled={isLoading}
							className='input'
							required
						/>

						<Button
							type='submit'
							size='lg'
							disabled={isLoading}
							className='login-button h-17 flex items-center justify-center gap-2'
						>
							{isLoading && <Loader size={24} className='size-6 animate-spin' />}
							{isLoading ? 'Signing In...' : 'Sign In'}
						</Button>

						<span className='text-gray-600'>
							Forgot your password?
							<Link
								href='/auth/reset'
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
