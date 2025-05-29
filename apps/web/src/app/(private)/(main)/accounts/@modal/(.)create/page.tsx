'use client'

import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AccountForm, AccountPayload, accountSchema } from '@/src/components/forms/account/form'
import { CREATE_ACCOUNT } from '@/src/server/accounts/create-account.mutation'

export default function CreateAccount() {
  const router = useRouter()

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT)

  const { register, handleSubmit, control, setValue } = useForm<AccountPayload>({
    resolver: zodResolver(accountSchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

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
        setShouldRefetch(true)
        toast.success('Conta financeira criada com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao criar conta financeira')
        console.error(err.message)
      })
  }

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Conta Financeira</DialogTitle>
        </DialogHeader>
        <AccountForm register={register} control={control} setFormValue={setValue} />
        <DialogFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleCreateAccount)}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
