import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchData = <T = any>(apiEndpoint: string) => {
	const [allData, setAllData] = useState<T | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [initialLoading, setInitialLoading] = useState<boolean>(true)

	useEffect(() => {
		if (initialLoading) {
			setInitialLoading(false)
			setLoading(false)
			return
		}

		setLoading(true)

		const fetchAllData = async () => {
			try {
				const res = await axios.get<T>(apiEndpoint)
				const allData = res.data

				setAllData(allData)

				setLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error)
				setLoading(false)
			}
		}

		// fetch blog data only if category exists
		if (apiEndpoint) {
			fetchAllData()
		}
	}, [initialLoading, apiEndpoint])

	return { allData, loading }
}
