'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@contecon/ui/components/table'
import { CategoriesRow } from './row'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { CategoriesColumns } from './columns'
import { useMutation, useQuery } from '@apollo/client'
import { CATEGORIES } from '@/src/server/categories/categories.query'
import { CategoriesSkeleton } from './skeleton'
import { CategoriesEmpty } from './empty'
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

export const CategoriesTable = () => {
  const router = useRouter()

  const shouldRefetch = useRefetchStore((s) => s.shouldRefetch)
  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const {
    data,
    loading,
    refetch: refetchCategories,
  } = useQuery(CATEGORIES, {
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
        refetchCategories()
        router.push('/categories')
        toast.success('Categoria deletada com sucesso')
      })
      .catch((error) => {
        console.error(error.message)
        toast.error('Erro ao deletar categoria')
      })
  }

  const table = useReactTable({
    data: data?.categories.items || [],
    columns: CategoriesColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    if (shouldRefetch) {
      refetchCategories()
      setShouldRefetch(false)
    }
  }, [shouldRefetch])

  if (loading) return <CategoriesSkeleton />

  return (
    <Card>
      {!(data?.categories.items.length === 0 || !data?.categories.items) && (
        <CardHeader className='grid grid-cols-2'>
          <SearchInput />
          <div className='flex items-center justify-end'>
            <Button onClick={() => router.push('/categories/create')}>
              <Plus />
              criar categoria
            </Button>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {data?.categories.items.length === 0 || !data?.categories.items ? (
          <CategoriesEmpty />
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
                <CategoriesRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        <PaginatedControls
          total={data?.categories.total || 0}
          currentPage={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          onPageChange={table.setPageIndex}
          onPageSizeChange={table.setPageSize}
        />
      </CardFooter>
      <DeleteItemModal path='/categories' onDelete={handleDeleteCategory} />
    </Card>
  )
}
