import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaRegAddressCard } from 'react-icons/fa6'

import { formatDate } from '@/utils/format-date'
import { DashboardHeader, LoginLayout } from '@/components'

const ViewContact = () => {
	const router = useRouter()

	const { id } = router.query

	const [contactInfo, setContactInfo] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchContact = async () => {
			try {
				const res = await axios.get(`/api/contacts?id=${id}`)

				setContactInfo(res.data)
			} catch (error) {
				console.error('[CONTACT_VIEW] Data boot error:', error)
			}
		}

		fetchContact()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>View Contact</title>
			</Head>

			<div className="content-page">
				<DashboardHeader
					title="Contact"
					subtitle={contactInfo?.email}
					icon={FaRegAddressCard}
					breadcrumb="view contact"
				/>

				<div className="contact-info mt-2">
					<h2 className="contact-info-header">Contact Details</h2>

					{contactInfo ? (
						<table className="contact-details-table">
							<tbody>
								<tr>
									<th>First Name:</th>
									<td>{contactInfo.firstName}</td>
								</tr>

								<tr>
									<th>Last Name:</th>
									<td>{contactInfo.lastName}</td>
								</tr>

								<tr>
									<th>Email:</th>
									<td>{contactInfo.email}</td>
								</tr>

								<tr>
									<th>Company:</th>
									<td>{contactInfo.company}</td>
								</tr>

								<tr>
									<th>Phone:</th>
									<td>{contactInfo.phone}</td>
								</tr>

								<tr>
									<th>Country:</th>
									<td>{contactInfo.country}</td>
								</tr>

								<tr>
									<th>Budget:</th>
									<td>{contactInfo.price}</td>
								</tr>

								<tr>
									<th>Description:</th>
									<td>{contactInfo.description}</td>
								</tr>

								<tr>
									<th>Project:</th>
									<td>
										{Array.isArray(contactInfo.project)
											? contactInfo.project.join(', ')
											: contactInfo.project}
									</td>
								</tr>

								<tr>
									<th>Contact time:</th>
									<td>{formatDate(contactInfo.createdAt)}</td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>Loading contact information...</p>
					)}
				</div>
			</div>
		</LoginLayout>
	)
}

export default ViewContact
