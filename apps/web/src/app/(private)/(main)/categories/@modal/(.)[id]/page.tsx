'use client'

import { CategoryForm, CategoryPayload, categorySchema } from '@/src/components/forms/categories/form'
import { CategoryFormSkeleton } from '@/src/components/forms/categories/skeleton'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CATEGORY } from '@/src/server/categories/category.query'
import { UPDATE_CATEGORY } from '@/src/server/categories/update-category.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const actualParams = React.use(params)
  const categoryId = actualParams.id

  const { data } = useQuery(CATEGORY, {
    variables: {
      categoryId,
    },
  })

  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY)

  const { register, handleSubmit, reset, control } = useForm<CategoryPayload>({
    resolver: zodResolver(categorySchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const handleUpdateCategory = (data: CategoryPayload) => {
    const { isActive, ...rest } = data

    const resolvedStatus = isActive === 'true'

    updateCategory({
      variables: {
        data: {
          id: categoryId,
          isActive: resolvedStatus,
          ...rest,
        },
      },
    })
      .then(() => {
        setShouldRefetch(true)
        router.back()
        toast.success('Categoria atualizada com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao atualizar categoria')
        console.error(err.message)
      })
  }

  useEffect(() => {
    if (data) {
      reset({
        name: data.category.name || '',
        description: data.category.description || '',
        isActive: data.category.isActive ? 'true' : 'false',
      })
    }
  }, [data, reset])

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      {loading ? (
        <DialogContent className='pt-12'>
          <CategoryFormSkeleton />
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data?.category.name}</DialogTitle>
          </DialogHeader>
          <CategoryForm register={register} control={control} />
          <DialogFooter className='gap-2 justify-end'>
            <Button
              type='button'
              variant='secondary'
              disabled={loading}
              loading={loading}
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleUpdateCategory)}>
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
