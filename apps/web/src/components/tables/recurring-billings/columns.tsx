import { useSearchParams } from '@/src/hooks/use-search-params'
import { formatCurrency } from '@/src/utils/format-currency'
import { RecurringBilling } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import { Checkbox } from '@contecon/ui/components/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, Pencil, Printer, Trash2 } from 'lucide-react'

export const columns: ColumnDef<RecurringBilling>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		header: 'Nome',
		accessorKey: 'name',
	},
	{
		header: 'Valor',
		accessorKey: 'amount',
		cell: ({ row }) => {
			return <div>{formatCurrency(row.original.amount)}</div>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { setParam } = useSearchParams()

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon'>
							<MoreVertical className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Printer />
							Imprimir
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Pencil />
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setParam('deleteId', row.original.id)}
						>
							<Trash2 />
							Deletar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
