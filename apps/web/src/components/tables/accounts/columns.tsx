import { useSearchParams } from '@/src/hooks/use-search-params'
import { resolveAccountType } from '@/src/utils/resolve-account-type'
import { Account } from '@contecon/graphql/lib/graphql'
import { Badge } from '@contecon/ui/components/badge'
import { Button } from '@contecon/ui/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const AccountColumns: ColumnDef<Account>[] = [
	{
		header: 'Banco',
		accessorKey: 'bank',
	},
	{
		header: 'Nome da conta',
		accessorKey: 'name',
	},
	{
		header: 'Tipo de conta',
		accessorKey: 'type',
		cell: ({ row }) => {
			return <Badge>{resolveAccountType(row.original.type)}</Badge>
		},
	},
	{
		header: 'Número da conta',
		accessorKey: 'number',
	},
	{
		header: 'Agência',
		accessorKey: 'agency',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const router = useRouter()
			const { setParam } = useSearchParams()

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon'>
							<MoreVertical className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => router.push(`/accounts/${row.original.id}`)}
						>
							<Pencil />
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setParam('deleteId', row.original.id)}
						>
							<Trash2 />
							Excluir
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]
