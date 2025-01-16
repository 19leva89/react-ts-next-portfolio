import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'

import { IContact } from '@/models/contact'
import { DashboardHeader, LoginLayout } from '@/components'

const DeleteContact = () => {
	const router = useRouter()

	const { id } = router.query

	const [contactInfo, setContactInfo] = useState<IContact | null>(null)

	const goBack = () => {
		router.push('/contacts')
	}

	const deleteContact = async () => {
		try {
			await axios.delete(`/api/contacts?id=${id}`)

			toast.success('Contact deleted successfully')

			goBack()
		} catch (error) {
			console.error('[CONTACTS_DELETE] Error deleting:', error)
		}
	}

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchContact = async () => {
			try {
				const res = await axios.get(`/api/contacts?id=${id}`)

				setContactInfo(res.data)
			} catch (error) {
				console.error('[CONTACTS_DELETE] Error loading data:', error)
			}
		}

		fetchContact()
	}, [id])

	return (
		<LoginLayout>
			<Head>
				<title>Delete Contact</title>
			</Head>

			<div className="content-page">
				<DashboardHeader title="Delete" subtitle={contactInfo?.email || ''} breadcrumbs={['contacts']} />

				<div className="delete-sec flex flex-center wh_100">
					<div className="delete-card">
						<TbTrashX size={60} color="red" />

						<p className="cookie-heading">Are you sure?</p>

						<p className="cookie-description">If you delete this contact, it will be deleted permanently</p>

						<div className="button-container">
							<button onClick={deleteContact} className="accept-button">
								Delete
							</button>

							<button onClick={goBack} className="decline-button">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</LoginLayout>
	)
}

export default DeleteContact
