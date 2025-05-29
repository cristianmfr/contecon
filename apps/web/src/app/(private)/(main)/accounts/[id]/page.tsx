'use client'

import { PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
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
import { AccountForm, AccountPayload, accountSchema } from '@/src/components/forms/account/form'
import { ACCOUNT } from '@/src/server/accounts/account.query'
import { UPDATE_ACCOUNT } from '@/src/server/accounts/update-account.mutation'
import { AccountFormSkeleton } from '@/src/components/forms/account/skeleton'

export default function AccountDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()

  const actualParams = React.use(params)
  const accountId = actualParams.id

  const { data } = useQuery(ACCOUNT, {
    variables: {
      accountId,
    },
  })

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
      label: `${data?.account.name}`,
      url: '/accounts/create',
    },
  ]

  const [updateAccount, { loading }] = useMutation(UPDATE_ACCOUNT)

  const { register, handleSubmit, reset, control, setValue, getValues } = useForm<AccountPayload>({
    resolver: zodResolver(accountSchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const handleUpdateAccount = (data: AccountPayload) => {
    updateAccount({
      variables: {
        data: {
          id: accountId,
          ...data,
        },
      },
    })
      .then(() => {
        router.back()
        setShouldRefetch(true)
        toast.success('Conta financeira atualizada com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao atualizar conta financeira')
        console.error(err.message)
      })
  }

  useEffect(() => {
    if (data) {
      reset({
        name: data.account.name || '',
        description: data.account.description || '',
        number: data.account.number || '',
        agency: data.account.agency || '',
        bank: data.account.bank || '',
        type: data.account.type || '',
        balance: data.account.balance || 0,
        credit: data.account.credit || 0,
      })
    }
  }, [data, reset])

  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>{data?.account.name}</PageTitle>
      </PageHeader>
      <Card>
        <CardContent>
          {loading ? (
            <AccountFormSkeleton />
          ) : (
            <AccountForm
              register={register}
              control={control}
              setFormValue={setValue}
              defaultValue={getValues('bank')}
            />
          )}
        </CardContent>
        <CardFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleUpdateAccount)}>
            Atualizar
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  )
}
