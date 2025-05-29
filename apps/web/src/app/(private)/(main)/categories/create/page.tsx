'use client'

import { CategoryForm, CategoryPayload, categorySchema } from '@/src/components/forms/categories/form'
import { CategoryFormSkeleton } from '@/src/components/forms/categories/skeleton'
import { BreadcrumbItem, PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
import { CREATE_CATEGORY } from '@/src/server/categories/create-category.mutation'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
    label: 'Adicionar',
    url: '/categories/create',
  },
]

export default function CreateCategory() {
  const router = useRouter()

  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY)

  const { register, handleSubmit, control } = useForm<CategoryPayload>({
    resolver: zodResolver(categorySchema),
  })

  const handleCreateCategory = (data: CategoryPayload) => {
    const { isActive, ...rest } = data

    const resolvedStatus = isActive === 'active'

    createCategory({
      variables: {
        data: {
          isActive: resolvedStatus,
          ...rest,
        },
      },
    })
      .then(() => {
        router.back()
        toast.success('Categoria criada com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao criar categoria')
        console.error(err.message)
      })
  }

  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>Adicionar Categoria</PageTitle>
      </PageHeader>
      <Card>
        <CardContent>
          {loading ? <CategoryFormSkeleton /> : <CategoryForm register={register} control={control} />}
        </CardContent>
        <CardFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleCreateCategory)}>
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  )
}
