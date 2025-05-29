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
import { useRouter } from 'next/navigation'
import { useSearchParams } from '@/src/hooks/use-search-params'

export const BeneficiaryColumns: ColumnDef<Beneficiary>[] = [
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
            <DropdownMenuItem onClick={() => router.push(`/beneficiaries/${row.original.id}`)}>
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
