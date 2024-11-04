export const formatDate = (date: Date | null) => {
	if (!date) {
		return ''
	}

	const parsedDate = new Date(date)
	if (isNaN(parsedDate.getTime())) {
		return ''
	}

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	}

	const locale = navigator.language || 'en-US'

	return new Intl.DateTimeFormat(locale, options).format(parsedDate)
}
