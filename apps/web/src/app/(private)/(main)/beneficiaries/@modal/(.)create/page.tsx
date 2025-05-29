'use client'

import { BeneficiaryForm, BeneficiaryPayload, beneficiarySchema } from '@/src/components/forms/beneficiaries/form'
import { CREATE_BENEFICIARY } from '@/src/server/beneficiaries/create-beneficiary.mutation'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { convertStringToISO } from '@/src/utils/convert-string-to-iso'

export default function CreateBeneficiary() {
  const router = useRouter()

  const [createBeneficiary, { loading }] = useMutation(CREATE_BENEFICIARY)

  const { register, handleSubmit, control } = useForm<BeneficiaryPayload>({
    resolver: zodResolver(beneficiarySchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const handleCreateBeneficiary = (data: BeneficiaryPayload) => {
    const { birthdate, ...rest } = data

    const dateToISO = birthdate ? convertStringToISO(birthdate) : null

    createBeneficiary({
      variables: {
        data: {
          birthdate: dateToISO,
          ...rest,
        },
      },
    })
      .then(() => {
        router.back()
        setShouldRefetch(true)
        toast.success('Favorecido criado com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao criar favorecido')
        console.error(err.message)
      })
  }

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Favorecido</DialogTitle>
        </DialogHeader>
        <BeneficiaryForm register={register} control={control} />
        <DialogFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleCreateBeneficiary)}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
