'use client'

import { AlertDeleteDialog } from '@/src/components/dialogs/alert-delete.dialog'
import { DELETE_RECURRING_BILL } from '@/src/graphql/mutations'
import { RECURRING_BILLS } from '@/src/graphql/queries'
import { useRecurringBillingParams } from '@/src/hooks/use-recurring-billing-params'
import { useMutation } from '@apollo/client'
import { RecurringBilling } from '@contecon/graphql/lib/graphql'
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
import { RecurringBillingEmptyState } from './empty-state'
import { RecurringBillingRow } from './row'

export const RecurringBillingTable = ({
	recurringBilling,
	revalidateRecurringBillingPath,
}: {
	recurringBilling: RecurringBilling[]
	revalidateRecurringBillingPath: () => Promise<void>
}) => {
	const { setParams, deleteRecurringBillingId } = useRecurringBillingParams()

	const [deleteRecurringBilling] = useMutation(DELETE_RECURRING_BILL, {
		variables: { deleteRecurringBillingId },
		refetchQueries: [
			{
				query: RECURRING_BILLS,
				variables: { query: { skip: 0, take: 10 } },
			},
		],
		onCompleted: () => {
			toast.success('Conta recorrente deletada com sucesso!')
			revalidateRecurringBillingPath()
		},
		onError: (error) => {
			toast.error('Erro ao deletar conta recorrente!')
			console.error(error)
		},
	})
	const table = useReactTable({
		data: recurringBilling,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (recurringBilling.length === 0) {
		return (
			<Card>
				<CardHeader>
					<RecurringBillingEmptyState />
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
							onClick={() => setParams({ createRecurringBilling: true })}
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
								<RecurringBillingRow key={row.id} row={row} />
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<AlertDeleteDialog onDelete={() => deleteRecurringBilling()} />
		</>
	)
}
