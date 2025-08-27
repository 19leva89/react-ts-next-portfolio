'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { CircleUserIcon } from 'lucide-react'

import { DashboardHeader } from '@/components/shared'

export const SettingsView = () => {
	return (
		<div className='setting-page'>
			<DashboardHeader title='Admin' subtitle='Settings' breadcrumbs={['settings']} />

			<div className='profile-settings'>
				<div className='left-profile-details flex items-center'>
					<Image src='/img/coder.png' alt='coder' width={200} height={300} quality={100} />

					<div className='w-full'>
						<div className='mt-8 flex items-start justify-between'>
							<h2>My profile:</h2>

							<h3>Sobolev Web Developer</h3>
						</div>

						<div className='mt-8 flex items-center justify-between'>
							<h3>Phone:</h3>

							<input type='tel' defaultValue='+380668745656' />
						</div>

						<div className='mt-8 flex items-center justify-between'>
							<h3>Email:</h3>

							<input type='email' defaultValue='youremail@gmail.com' />
						</div>

						<div className='mt-8 flex w-full items-center justify-center'>
							<button>Save</button>
						</div>
					</div>
				</div>

				<div className='right-logout-sec flex items-center'>
					<div className='top-account-box'>
						<h2 className='flex items-center justify-between'>
							My account
							<CircleUserIcon size={16} />
						</h2>

						<hr />

						<div className='mt-4 flex items-center justify-between'>
							<h3>
								Active account <br /> <span>Email</span>
							</h3>

							<button onClick={() => signOut()}>Logout</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
