import { useBeneficiaryParams } from '@/src/hooks/use-beneficiary-params'
import { Beneficiary } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

export const columns: ColumnDef<Beneficiary>[] = [
	{
		header: 'Nome',
		accessorKey: 'name',
	},
	{
		header: 'E-mail',
		accessorKey: 'email',
	},
	{
		header: 'Telefone',
		accessorKey: 'phone',
	},
	{
		header: 'Documento',
		accessorKey: 'document',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { setParams } = useBeneficiaryParams()

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon'>
							<MoreVertical className='size-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem
							onClick={() => setParams({ beneficiaryId: row.original.id })}
						>
							<Pencil />
							Editar
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								setParams({ deleteBeneficiaryId: row.original.id })
							}
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
