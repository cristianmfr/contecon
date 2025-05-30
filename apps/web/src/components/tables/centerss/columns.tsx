'use client'

import { Center } from '@contecon/graphql/lib/graphql'
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

export const columns: ColumnDef<Center>[] = [
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
			const { id } = row.original

			const handleEdit = () => {
				console.log(id)
			}

			const handleDelete = () => {
				console.log(id)
			}

			return (
				<div className='flex items-center justify-end'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' size='xs'>
								<MoreVertical className='size-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={handleEdit}>
								<Pencil className='w-4 h-4' />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleDelete}>
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
