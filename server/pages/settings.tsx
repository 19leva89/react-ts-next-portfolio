import Image from 'next/image'
import { signOut } from 'next-auth/react'

import { DashboardHeader, LoginLayout } from '@/components'

import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineAccountCircle } from 'react-icons/md'

const Settings = () => {
	return (
		<LoginLayout>
			<div className="setting-page">
				<DashboardHeader title="Admin" subtitle="Settings" icon={IoSettingsOutline} breadcrumb="settings" />

				<div className="profile-settings">
					<div className="left-profile-details flex">
						<Image src="/img/coder.png" alt="coder" width={200} height={300} />

						<div className="w-100">
							<div className="flex flex-sb flex-left mt-2">
								<h2>My profile:</h2>

								<h3>
									Sobolev <br />
									Web Developer
								</h3>
							</div>

							<div className="flex flex-sb mt-2">
								<h3>Phone:</h3>

								<input type="tel" defaultValue={'+380668745656'} />
							</div>

							<div className="flex flex-sb mt-2">
								<h3>Email:</h3>

								<input type="email" defaultValue={'youremail@gmail.com'} />
							</div>

							<div className="flex flex-center w-100 mt-2">
								<button>Save</button>
							</div>
						</div>
					</div>

					<div className="right-logout-sec flex">
						<div className="top-account-box">
							<h2 className="flex flex-sb">
								My account
								<MdOutlineAccountCircle />
							</h2>

							<hr />

							<div className="flex flex-sb mt-1">
								<h3>
									Active account <br /> <span>Email</span>
								</h3>

								<button onClick={() => signOut()}>Logout</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</LoginLayout>
	)
}

export default Settings
