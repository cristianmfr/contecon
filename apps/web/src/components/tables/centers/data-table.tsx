'use client'

import { AlertDeleteDialog } from '@/src/components/dialogs/alert-delete.dialog'
import { DELETE_CENTER } from '@/src/graphql/mutations'
import { CENTERS } from '@/src/graphql/queries'
import { useCenterParams } from '@/src/hooks/use-centers-params'
import { useMutation } from '@apollo/client'
import { Center } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardHeader } from '@contecon/ui/components/card'
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
import { Plus, Settings2 } from 'lucide-react'
import { toast } from 'sonner'

import { SearchInput } from '../../search-input'
import { columns } from './columns'
import { CentersEmptyState } from './empty-state'
import { CentersRow } from './rows'

export const CentersTable = ({
	centers,
	revalidateCentersPath,
}: {
	centers: Center[]
	revalidateCentersPath: () => Promise<void>
}) => {
	const { setParams, deleteCenterId } = useCenterParams()

	const [deleteCenter] = useMutation(DELETE_CENTER, {
		variables: { deleteCenterId },
		refetchQueries: [
			{ query: CENTERS, variables: { query: { skip: 0, take: 10 } } },
		],
		onCompleted: () => {
			toast.success('Centro de custos deletado com sucesso!')
			revalidateCentersPath()
		},
		onError: (error) => {
			toast.error('Erro ao deletar centro de custos!')
			console.error(error)
		},
	})
	const table = useReactTable({
		data: centers,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (centers.length === 0) {
		return (
			<Card>
				<CardHeader>
					<CentersEmptyState />
				</CardHeader>
			</Card>
		)
	}

	return (
		<>
			<Card>
				<CardHeader className='grid grid-cols-2 w-full'>
					<SearchInput />
					<div className='flex items-center justify-end gap-2'>
						<Button variant='outline' size='icon'>
							<Settings2 className='size-4' />
						</Button>
						<Button
							size='icon'
							onClick={() => setParams({ createCenter: true })}
						>
							<Plus className='size-4' />
						</Button>
					</div>
				</CardHeader>
				<CardContent>
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
				</CardContent>
			</Card>

			<AlertDeleteDialog onDelete={() => deleteCenter()} />
		</>
	)
}
