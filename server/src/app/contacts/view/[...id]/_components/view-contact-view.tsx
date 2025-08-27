'use client'

import axios from 'axios'
import Link from 'next/link'
import { Trash2Icon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { IContact } from '@/models/contact'
import { formatDate } from '@/utils/format-date'
import { DashboardHeader } from '@/components/shared'

export const ViewContactView = () => {
	const { id } = useParams() as { id: string }

	const [contactInfo, setContactInfo] = useState<IContact | null>(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchAndMarkContact = async () => {
			try {
				const res = await axios.get(`/api/contacts?id=${encodeURIComponent(id)}`)
				const contact = res.data

				setContactInfo(contact)

				// Updating the viewed field
				if (!contact.viewed) {
					await axios.put(`/api/contacts`, { _id: encodeURIComponent(id), viewed: true })
				}
			} catch (error) {
				console.error('[CONTACT_VIEW] Error fetching or updating contact:', error)
			}
		}

		fetchAndMarkContact()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader
				title='Contact'
				subtitle={contactInfo ? contactInfo.email : ''}
				breadcrumbs={['contacts']}
			/>

			<div className='contact-info mt-8'>
				<div className='mb-4 flex items-center justify-between gap-2'>
					<h2 className='contact-info-header'>Contact Details</h2>

					<Link href={`/contacts/delete/${id}`} className='contact-info-link'>
						<button className='p-2'>
							<Trash2Icon size={15} />
						</button>
					</Link>
				</div>

				{contactInfo ? (
					<table className='contact-details-table'>
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
									{Array.isArray(contactInfo.project) ? contactInfo.project.join(', ') : contactInfo.project}
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
	)
}
