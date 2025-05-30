'use client'

import { DeleteItemModal } from '@/src/components/modals/delete-item-modal'
import { SearchInput } from '@/src/components/search-input'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CENTERS } from '@/src/server/centers/centers.query'
import { DELETE_CENTER } from '@/src/server/centers/delete-center.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { CardHeader } from '@contecon/ui/components/card'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@contecon/ui/components/table'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PaginatedControls } from '../../paginated-controls'
import { CentersColumns } from './columns'
import { CentersEmpty } from './empty'
import { CentersRow } from './row'
import { CentersSkeleton } from './skeleton'

export const CentersTable = () => {
	const router = useRouter()

	const shouldRefetch = useRefetchStore((s) => s.shouldRefetch)
	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const {
		data,
		loading,
		refetch: refetchCenters,
	} = useQuery(CENTERS, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	})

	const [deleteCenter] = useMutation(DELETE_CENTER)

	const searchParams = useSearchParams()
	const itemId = searchParams.get('deleteId')

	const handleDeleteCenter = () => {
		deleteCenter({
			variables: {
				deleteCenterId: itemId,
			},
		})
			.then(() => {
				refetchCenters()
				router.push('/centers')
				toast.success('Centro de custo deletado com sucesso')
			})
			.catch((error) => {
				console.error(error.message)
				toast.error('Erro ao deletar centro de custo')
			})
	}

	const table = useReactTable({
		data: data?.centers.items || [],
		columns: CentersColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		if (shouldRefetch) {
			refetchCenters()
			setShouldRefetch(false)
		}
	}, [shouldRefetch])

	if (loading) return <CentersSkeleton />

	return (
		<Card>
			{!(data?.centers.items.length === 0 || !data?.centers.items) && (
				<CardHeader className='grid grid-cols-2'>
					<SearchInput />
					<div className='flex items-center justify-end'>
						<Button onClick={() => router.push('/centers/create')}>
							<Plus />
							criar centro de custo
						</Button>
					</div>
				</CardHeader>
			)}
			<CardContent>
				{data?.centers.items.length === 0 || !data?.centers.items ? (
					<CentersEmpty />
				) : (
					<Table className='border-separate border-spacing-y-[5px]'>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className='hover:bg-transparent border-none'
								>
									{headerGroup.headers.map((header, index) => {
										const isFirst = index === 0
										const isLast = index === headerGroup.headers.length - 1

										return (
											<TableHead
												key={header.id}
												className={`${isFirst ? 'pl-6' : ''} ${isLast ? 'text-right' : ''}`}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<CentersRow key={row.id} row={row} />
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<CardFooter>
				<PaginatedControls
					total={data?.centers.total || 0}
					currentPage={table.getState().pagination.pageIndex}
					pageSize={table.getState().pagination.pageSize}
					onPageChange={table.setPageIndex}
					onPageSizeChange={table.setPageSize}
				/>
			</CardFooter>
			<DeleteItemModal path='/centers' onDelete={handleDeleteCenter} />
		</Card>
	)
}
