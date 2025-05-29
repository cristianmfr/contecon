import { Center } from '@contecon/graphql/lib/graphql'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@contecon/ui/components/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@contecon/ui/components/dropdown-menu'
import { Button } from '@contecon/ui/components/button'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from '@/src/hooks/use-search-params'

export const CentersColumns: ColumnDef<Center>[] = [
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
    cell: ({ row }) => {
      return <Badge>{row.original.isActive ? 'Ativo' : 'Inativo'}</Badge>
    },
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
            <DropdownMenuItem onClick={() => router.push(`/centers/${row.original.id}`)}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setParam('deleteId', row.original.id)}>
              <Trash2 />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
