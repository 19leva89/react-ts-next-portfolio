import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetchData = (apiEndpoint) => {

	const [allData, setAllData] = useState([])
	const [loading, setLoading] = useState(true)
	const [initialLoading, setInitialLoading] = useState(true)

	useEffect(() => {

		if (initialLoading) {
			setInitialLoading(false)
			setLoading(false)
			return
		}

		setLoading(true)

		const fetchAllData = async () => {
			try {
				const res = await axios.get(apiEndpoint)
				const allData = res.data

				setAllData(allData)

				setLoading(false)
			} catch (error) {
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