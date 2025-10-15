import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Props {
	paginate: (page: number) => void
	currentPage: number
	totalPages: number
}

export const Pagination = ({ paginate, currentPage, totalPages }: Props) => {
	const pageNumbers = []

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i)
	}

	return (
		<div className='content-pagination mt-12 flex items-center justify-center'>
			<button
				onClick={() => paginate(currentPage - 1)}
				disabled={currentPage === 1}
				className='flex items-center justify-center'
			>
				<ChevronLeftIcon size={26} />
			</button>

			{pageNumbers
				.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
				.map((number) => (
					<button
						key={number}
						onClick={() => paginate(number)}
						className={`${currentPage === number ? 'active' : ''}`}
					>
						<span>{number}</span>
					</button>
				))}

			<button
				onClick={() => paginate(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='flex items-center justify-center'
			>
				<ChevronRightIcon size={26} />
			</button>
		</div>
	)
}
