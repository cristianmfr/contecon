'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@contecon/ui/components/table'
import { EntriesRow } from './row'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { EntriesColumns } from './columns'
import { useMutation, useQuery } from '@apollo/client'
import { ENTRIES } from '@/src/server/entries/entries.query'
import { EntriesSkeleton } from './skeleton'
import { EntriesEmpty } from './empty'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { SearchInput } from '@/src/components/search-input'
import { CardHeader } from '@contecon/ui/components/card'
import { Button } from '@contecon/ui/components/button'
import { FilePlus, FileSpreadsheet, FileText, Menu, Pencil, Plus, Trash2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PaginatedControls } from '../../paginated-controls'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { useEffect } from 'react'
import { DeleteItemModal } from '@/src/components/modals/delete-item-modal'
import { toast } from 'sonner'
import { DELETE_ENTRY } from '@/src/server/entries/delete-entry.mutation'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@contecon/ui/components/dropdown-menu'

export const EntriesTable = () => {
  const router = useRouter()

  const shouldRefetch = useRefetchStore((s) => s.shouldRefetch)
  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const {
    data,
    loading,
    refetch: refetchEntries,
  } = useQuery(ENTRIES, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  const [deleteEntry] = useMutation(DELETE_ENTRY)

  const searchParams = useSearchParams()
  const itemId = searchParams.get('deleteId')

  const handleDeleteEntry = () => {
    deleteEntry({
      variables: {
        deleteEntryId: itemId,
      },
    })
      .then(() => {
        refetchEntries()
        router.push('/entries')
        toast.success('Lançamento deletado com sucesso')
      })
      .catch((error) => {
        console.error(error.message)
        toast.error('Erro ao deletar lançamento')
      })
  }

  const table = useReactTable({
    data: data?.entries.items || [],
    columns: EntriesColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    if (shouldRefetch) {
      refetchEntries()
      setShouldRefetch(false)
    }
  }, [shouldRefetch])

  if (loading) return <EntriesSkeleton />

  return (
    <Card>
      {!(data?.entries.items.length === 0 || !data?.entries.items) && (
        <CardHeader className='grid grid-cols-2'>
          <SearchInput />
          <div className='flex items-center justify-end gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='icon'>
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <FilePlus />
                  Criar nota fiscal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileSpreadsheet />
                  Exportar CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText />
                  Exportar PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Trash2 />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => router.push('/entries/create')}>
              <Plus />
              criar lançamento
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {data?.entries.items.length === 0 || !data?.entries.items ? (
          <EntriesEmpty />
        ) : (
          <Table className='border-separate border-spacing-y-[5px]'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='hover:bg-transparent border-none'>
                  {headerGroup.headers.map((header, index) => {
                    const isFirst = index === 0
                    const isLast = index === headerGroup.headers.length - 1

                    return (
                      <TableHead key={header.id} className={`${isFirst ? 'pl-6' : ''} ${isLast ? 'text-right' : ''}`}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
        )}
      </CardContent>
      <CardFooter>
        <PaginatedControls
          total={data?.entries.total || 0}
          currentPage={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          onPageChange={table.setPageIndex}
          onPageSizeChange={table.setPageSize}
        />
      </CardFooter>
      <DeleteItemModal path='/entries' onDelete={handleDeleteEntry} />
    </Card>
  )
}
