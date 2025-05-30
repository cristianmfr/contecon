import { useEntryParams } from '@/src/hooks/use-entry-params'
import { formatCurrency } from '@/src/utils/format-currency'
import { Entry } from '@contecon/graphql/lib/graphql'
import { Badge } from '@contecon/ui/components/badge'
import { Button } from '@contecon/ui/components/button'
import { Checkbox } from '@contecon/ui/components/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { cn } from '@contecon/ui/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
	ArrowDownLeft,
	ArrowLeftRight,
	ArrowUpRight,
	MoreVertical,
	Pencil,
	Printer,
	Trash2,
} from 'lucide-react'

export const columns: ColumnDef<Entry>[] = [
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
		header: 'Identificador',
		accessorKey: 'description',
	},
	{
		header: 'Data',
		accessorKey: 'dueDate',
		cell: ({ row }) => {
			return <div>{format(row.original.dueDate, 'dd/MM/yyyy')}</div>
		},
	},
	{
		header: 'Favorecido',
		accessorKey: 'beneficiary',
		cell: ({ row }) => {
			return <div>{row.original.beneficiary?.name ?? '-'}</div>
		},
	},
	{
		header: 'Valor',
		accessorKey: 'totalValue',
		cell: ({ row }) => {
			return <div>{formatCurrency(row.original.totalValue)}</div>
		},
	},
	{
		header: 'Tipo',
		accessorKey: 'type',
		cell: ({ row }) => {
			const resolvedType = () => {
				switch (row.original.type) {
					case 'receipt':
						return 'Recebimento'
					case 'payment':
						return 'Pagamento'
					case 'transfer':
						return 'Transferência'
					default:
						return '-'
				}
			}

			const resolvedVariant = () => {
				switch (row.original.type) {
					case 'receipt':
						return 'bg-blue-500/5 text-blue-500'
					case 'payment':
						return 'bg-red-500/5 text-red-500'
					case 'transfer':
						return 'bg-purple-500/5 text-purple-500'
					default:
						return 'bg-gray-500/5 text-gray-500'
				}
			}

			const resolvedIcon = () => {
				switch (row.original.type) {
					case 'receipt':
						return <ArrowDownLeft />
					case 'payment':
						return <ArrowUpRight />
					case 'transfer':
						return <ArrowLeftRight />
					default:
						return null
				}
			}

			return (
				<Badge className={cn(resolvedVariant())}>
					{resolvedIcon()}
					{resolvedType()}
				</Badge>
			)
		},
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: ({ row }) => {
			const resolvedStatus = () => {
				switch (row.original.status) {
					case 'pending':
						return 'Pendente'
					case 'received':
						return 'Recebido'
					case 'overdue':
						return 'Vencido'
					case 'cancelled':
						return 'Cancelado'
					case 'partially_received':
						return 'Parcialmente recebido'
				}
			}

			const resolvedVariant = () => {
				switch (row.original.status) {
					case 'pending':
						return 'warning'
					case 'received':
						return 'success'
					case 'overdue':
						return 'overdue'
					case 'cancelled':
						return 'cancelled'
					case 'partially_received':
						return 'partiallyReceived'
					default:
						return 'default'
				}
			}
			return <Badge variant={resolvedVariant()}>{resolvedStatus()}</Badge>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { setParams } = useEntryParams()

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
							onClick={() => setParams({ deleteEntryId: row.original.id })}
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
