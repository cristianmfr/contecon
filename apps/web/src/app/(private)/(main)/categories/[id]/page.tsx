'use client'

import { CategoryForm, CategoryPayload, categorySchema } from '@/src/components/forms/categories/form'
import { PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
import { CATEGORY } from '@/src/server/categories/category.query'
import { UPDATE_CATEGORY } from '@/src/server/categories/update-category.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { BreadcrumbItem } from '@/src/components/page-layout'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CategoryFormSkeleton } from '@/src/components/forms/categories/skeleton'

export default function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()

  const actualParams = React.use(params)
  const categoryId = actualParams.id

  const { data } = useQuery(CATEGORY, {
    variables: {
      categoryId,
    },
  })

  const breadcrumbData: BreadcrumbItem[] = [
    {
      label: 'Dashboard',
      url: '/',
    },
    {
      label: 'Categorias',
      url: '/categories',
    },
    {
      label: `${data?.category.name}`,
      url: '/categories/create',
    },
  ]

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
        router.back()
        setShouldRefetch(true)
        toast.success('Categoria atualizado com sucesso')
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
        isActive: data.category.isActive ? 'active' : 'disabled',
      })
    }
  }, [data, reset])

  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>{data?.category.name}</PageTitle>
      </PageHeader>
      <Card>
        <CardContent>
          {loading ? <CategoryFormSkeleton /> : <CategoryForm register={register} control={control} />}
        </CardContent>
        <CardFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleUpdateCategory)}>
            Atualizar
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  )
}
