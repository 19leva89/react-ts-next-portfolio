'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { IContact } from '@/models/contact'
import { DashboardHeader } from '@/components/shared'

export const DeleteContactView = () => {
	const router = useRouter()
	const { id } = useParams() as { id: string }

	const [contactInfo, setContactInfo] = useState<IContact | null>(null)

	const goBack = () => {
		router.push('/contacts')
	}

	const deleteContact = async () => {
		try {
			await axios.delete(`/api/contacts?id=${encodeURIComponent(id)}`)

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
				const res = await axios.get(`/api/contacts?id=${encodeURIComponent(id)}`)

				setContactInfo(res.data)
			} catch (error) {
				console.error('[CONTACTS_DELETE] Error loading data:', error)
			}
		}

		fetchContact()
	}, [id])

	return (
		<div className='content-page'>
			<DashboardHeader title='Delete' subtitle={contactInfo?.email || ''} breadcrumbs={['contacts']} />

			<div className='delete-sec flex h-screen w-screen items-center justify-center'>
				<div className='delete-card'>
					<Trash2Icon size={60} color='red' />

					<p className='cookie-heading'>Are you sure?</p>

					<p className='cookie-description'>If you delete this contact, it will be deleted permanently</p>

					<div className='button-container'>
						<button onClick={deleteContact} className='accept-button'>
							Delete
						</button>

						<button onClick={goBack} className='decline-button'>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
