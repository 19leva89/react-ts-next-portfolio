export const formatDate = (date) => {
	if (!date) {
		return ''
	}

	const parsedDate = new Date(date)
	if (isNaN(parsedDate.getTime())) {
		return ''
	}

	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }

	return new Intl.DateTimeFormat('en-US', options).format(parsedDate)
}