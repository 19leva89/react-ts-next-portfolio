'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { CircleUserIcon } from 'lucide-react'

import { DashboardHeader } from '@/components/shared'

const SettingsPage = () => {
	return (
		<div className="setting-page">
			<DashboardHeader title="Admin" subtitle="Settings" breadcrumbs={['settings']} />

			<div className="profile-settings">
				<div className="left-profile-details flex items-center">
					<Image src="/img/coder.png" alt="coder" width={200} height={300} quality={100} />

					<div className="w-full">
						<div className="flex items-start justify-between mt-8">
							<h2>My profile:</h2>

							<h3>Sobolev Web Developer</h3>
						</div>

						<div className="flex items-center justify-between mt-8">
							<h3>Phone:</h3>

							<input type="tel" defaultValue="+380668745656" />
						</div>

						<div className="flex items-center justify-between mt-8">
							<h3>Email:</h3>

							<input type="email" defaultValue="youremail@gmail.com" />
						</div>

						<div className="flex items-center justify-center w-full mt-8">
							<button>Save</button>
						</div>
					</div>
				</div>

				<div className="right-logout-sec flex items-center">
					<div className="top-account-box">
						<h2 className="flex items-center justify-between">
							My account
							<CircleUserIcon size={16} />
						</h2>

						<hr />

						<div className="flex items-center justify-between mt-4">
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

export default SettingsPage
