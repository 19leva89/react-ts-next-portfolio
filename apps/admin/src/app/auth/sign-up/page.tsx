'use client'

import axios from 'axios'
import Link from 'next/link'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'

import { Button } from '@repo/ui/components'
import { Spinner } from '@/components/shared'

const SignUpPage = () => {
	const router = useRouter()
	const { status: sessionStatus } = useSession()

	const [isLoading, setIsLoading] = useState<boolean>(false)
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
		setIsLoading(true)

		try {
			if (form.password !== form.confirmPassword) {
				toast.error('Passwords do not match')

				return
			}

			const { data } = await axios.post('/api/auth/sign-up', form, {
				headers: { 'Content-Type': 'application/json' },
			})

			if (data.error) {
				toast.error('Error happened here')
			} else {
				toast.success('Sign up successful')

				router.push('/auth/sign-in')
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`Sign up failed: ${error.message}`)
			} else {
				toast.error('Sign up failed: unknown error')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='h-screen! flex items-center justify-center'>
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

						<input
							type='password'
							name='confirmPassword'
							placeholder='Confirm password'
							onChange={handleChange}
							value={form.confirmPassword}
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
							{isLoading ? 'Signing Up...' : 'Sign Up'}
						</Button>

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
