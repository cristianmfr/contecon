'use client'

import { AlertDeleteDialog } from '@/src/components/dialogs/alert-delete.dialog'
import { DELETE_ENTRY } from '@/src/graphql/mutations'
import { ENTRIES } from '@/src/graphql/queries'
import { useEntryParams } from '@/src/hooks/use-entry-params'
import { useMutation } from '@apollo/client'
import { Entry } from '@contecon/graphql/lib/graphql'
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
import { EntriesEmptyState } from './empty-state'
import { EntriesRow } from './row'

export const EntriesTable = ({
	entries,
	revalidateEntriesPath,
}: {
	entries: Entry[]
	revalidateEntriesPath: () => Promise<void>
}) => {
	const { setParams, deleteEntryId } = useEntryParams()

	const [deleteEntry] = useMutation(DELETE_ENTRY, {
		variables: { deleteEntryId },
		refetchQueries: [
			{ query: ENTRIES, variables: { query: { skip: 0, take: 10 } } },
		],
		onCompleted: () => {
			toast.success('Lançamento deletado com sucesso!')
			revalidateEntriesPath()
		},
		onError: (error) => {
			toast.error('Erro ao deletar lançamento!')
			console.error(error)
		},
	})
	const table = useReactTable({
		data: entries,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (entries.length === 0) {
		return (
			<Card>
				<CardHeader>
					<EntriesEmptyState />
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
							onClick={() => setParams({ createEntry: true })}
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
								<EntriesRow key={row.id} row={row} />
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<AlertDeleteDialog onDelete={() => deleteEntry()} />
		</>
	)
}
