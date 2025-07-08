'use client'

import { useCategoryParams } from '@/src/hooks/use-category-params'
import { Category } from '@contecon/graphql/lib/graphql'
import { Badge } from '@contecon/ui/components/badge'
import { Button } from '@contecon/ui/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreVertical, Pencil, Trash } from 'lucide-react'

export const columns: ColumnDef<Category>[] = [
	{
		header: 'Nome',
		accessorKey: 'name',
	},
	{
		header: 'Descrição',
		accessorKey: 'description',
	},
	{
		header: 'Status',
		accessorKey: 'isActive',
		cell: ({ row }) => (
			<Badge variant='outline'>
				{row.original.isActive ? 'Ativo' : 'Inativo'}
			</Badge>
		),
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// eslint-disable-next-line react-hooks/rules-of-hooks
			const { setParams } = useCategoryParams()

			return (
				<div className='flex items-center justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='xs'>
								<MoreVertical className='size-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => setParams({ categoryId: row.original.id })}
							>
								<Pencil className='w-4 h-4' />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setParams({ deleteCategoryId: row.original.id })}
							>
								<Trash className='w-4 h-4' />
								Excluir
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
]
