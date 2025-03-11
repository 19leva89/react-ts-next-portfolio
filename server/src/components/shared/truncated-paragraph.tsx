'use client'

import { useState } from 'react'

interface TruncatedParagraphProps {
	text: string
	wordLimit: number
}

export const TruncatedParagraph = ({ text, wordLimit }: TruncatedParagraphProps) => {
	const [isTruncated, setIsTruncated] = useState<boolean>(true)

	const toggleTruncate = () => {
		setIsTruncated(!isTruncated)
	}

	const truncatedText = isTruncated ? text.split(' ').slice(0, wordLimit).join(' ') + '...' : text

	return <p onClick={toggleTruncate}>{truncatedText}</p>
}
