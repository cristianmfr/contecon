'use client'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@contecon/ui/components/pagination'

import { PageSizeSelector } from './page-size-selector'

type PaginatedControlsProps = {
	total: number
	currentPage: number
	pageSize: number
	onPageChange: (page: number) => void
	onPageSizeChange: (size: number) => void
}

export function PaginatedControls({
	total,
	currentPage,
	pageSize,
	onPageChange,
	onPageSizeChange,
}: PaginatedControlsProps) {
	const totalPages = Math.ceil(total / pageSize)

	const getPageNumbers = () => {
		const pages: (number | 'ellipsis')[] = []

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i)
		} else {
			if (currentPage <= 4) {
				pages.push(1, 2, 3, 4, 5, 'ellipsis', totalPages)
			} else if (currentPage >= totalPages - 3) {
				pages.push(
					1,
					'ellipsis',
					totalPages - 4,
					totalPages - 3,
					totalPages - 2,
					totalPages - 1,
					totalPages,
				)
			} else {
				pages.push(
					1,
					'ellipsis',
					currentPage - 1,
					currentPage,
					currentPage + 1,
					'ellipsis',
					totalPages,
				)
			}
		}

		return pages
	}

	if (totalPages < 1) return null

	return (
		<div className='grid grid-cols-2 w-full'>
			<PageSizeSelector
				pageSize={pageSize}
				onPageSizeChange={onPageSizeChange}
			/>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(currentPage - 1)}
							className={
								currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
							}
						/>
					</PaginationItem>

					{getPageNumbers().map((page, idx) => (
						<PaginationItem key={idx}>
							{page === 'ellipsis' ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									isActive={currentPage === page}
									onClick={() => onPageChange(page)}
								>
									{page}
								</PaginationLink>
							)}
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext
							onClick={() => {
								if (currentPage !== totalPages) {
									onPageChange(currentPage + 1)
								}
							}}
							className={
								currentPage === totalPages
									? 'cursor-not-allowed opacity-50'
									: ''
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
