'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@contecon/ui/components/table'
import { BeneficiariesRow } from './row'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { BeneficiaryColumns } from './columns'
import { useMutation, useQuery } from '@apollo/client'
import { BENEFICIARIES } from '@/src/server/beneficiaries/beneficiaries.query'
import { BeneficiariesSkeleton } from './skeleton'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { SearchInput } from '@/src/components/search-input'
import { CardHeader } from '@contecon/ui/components/card'
import { Button } from '@contecon/ui/components/button'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PaginatedControls } from '../../paginated-controls'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { useEffect } from 'react'
import { DeleteItemModal } from '@/src/components/modals/delete-item-modal'
import { DELETE_CATEGORY } from '@/src/server/categories/delete-category.mutation'
import { toast } from 'sonner'
import { BeneficiariesEmpty } from './empty'

export const BeneficiariesTable = () => {
  const router = useRouter()

  const shouldRefetch = useRefetchStore((s) => s.shouldRefetch)
  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const {
    data,
    loading,
    refetch: refetchBeneficiaries,
  } = useQuery(BENEFICIARIES, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  const searchParams = useSearchParams()
  const itemId = searchParams.get('deleteId')

  const handleDeleteCategory = () => {
    deleteCategory({
      variables: {
        deleteCategoryId: itemId,
      },
    })
      .then(() => {
        refetchBeneficiaries()
        router.push('/beneficiaries')
        toast.success('Favorecido deletado com sucesso')
      })
      .catch((error) => {
        console.error(error.message)
        toast.error('Erro ao deletar favorecido')
      })
  }

  const table = useReactTable({
    data: data?.beneficiaries.items || [],
    columns: BeneficiaryColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    if (shouldRefetch) {
      refetchBeneficiaries()
      setShouldRefetch(false)
    }
  }, [shouldRefetch])

  if (loading) return <BeneficiariesSkeleton />

  return (
    <Card>
      {!(data?.beneficiaries.items.length === 0 || !data?.beneficiaries.items) && (
        <CardHeader className='grid grid-cols-2'>
          <SearchInput />
          <div className='flex items-center justify-end'>
            <Button onClick={() => router.push('/beneficiaries/create')}>
              <Plus />
              criar favorecido
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {data?.beneficiaries.items.length === 0 || !data?.beneficiaries.items ? (
          <BeneficiariesEmpty />
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
                <BeneficiariesRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <PaginatedControls
          total={data?.beneficiaries.total || 0}
          currentPage={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          onPageChange={table.setPageIndex}
          onPageSizeChange={table.setPageSize}
        />
      </CardFooter>
      <DeleteItemModal path='/beneficiaries' onDelete={handleDeleteCategory} />
    </Card>
  )
}
