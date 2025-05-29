'use client'

import { AccountForm, AccountPayload, accountSchema } from '@/src/components/forms/account/form'
import { BreadcrumbItem, PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
import { CREATE_ACCOUNT } from '@/src/server/accounts/create-account.mutation'
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
    label: 'Contas financeiras',
    url: '/accounts',
  },
  {
    label: 'Adicionar',
    url: '/accounts/create',
  },
]

export default function CreateAccount() {
  const router = useRouter()

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT)

  const { register, handleSubmit, control, setValue } = useForm<AccountPayload>({
    resolver: zodResolver(accountSchema),
  })

  const handleCreateAccount = (data: AccountPayload) => {
    createAccount({
      variables: {
        data: {
          ...data,
        },
      },
    })
      .then(() => {
        router.back()
        toast.success('Conta financeira criada com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao criar conta financeira')
        console.error(err.message)
      })
  }

  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>Adicionar conta financeira</PageTitle>
      </PageHeader>
      <Card>
        <CardContent>
          <AccountForm register={register} control={control} setFormValue={setValue} />
        </CardContent>
        <CardFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleCreateAccount)}>
            Adicionar
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  )
}
