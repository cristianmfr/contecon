'use client'

import { BeneficiaryPayload, beneficiarySchema } from '@/src/components/forms/beneficiaries/form'
import { UPDATE_BENEFICIARY } from '@/src/server/beneficiaries/update-beneficiary.mutation'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { BENEFICIARY } from '@/src/server/beneficiaries/beneficiary.query'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { convertStringToISO } from '@/src/utils/convert-string-to-iso'
import { format } from 'date-fns'
import { BeneficiaryForm } from '@/src/components/forms/beneficiaries/form'
import { BeneficiaryFormSkeleton } from '@/src/components/forms/beneficiaries/skeleton'

export default function BeneficiaryDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const actualParams = React.use(params)
  const beneficiaryId = actualParams.id

  const { data } = useQuery(BENEFICIARY, {
    variables: {
      id: beneficiaryId,
    },
  })

  const [updateBeneficiary, { loading }] = useMutation(UPDATE_BENEFICIARY)

  const { register, handleSubmit, reset, control } = useForm<BeneficiaryPayload>({
    resolver: zodResolver(beneficiarySchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const handleUpdateBeneficiary = (data: BeneficiaryPayload) => {
    const { birthdate, ...rest } = data

    const dateToISO = birthdate ? convertStringToISO(birthdate) : null

    updateBeneficiary({
      variables: {
        data: {
          id: beneficiaryId,
          birthdate: dateToISO,
          ...rest,
        },
      },
    })
      .then(() => {
        setShouldRefetch(true)
        router.back()
        toast.success('Favorecido atualizado com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao atualizar favorecido')
        console.error(err.message)
      })
  }

  useEffect(() => {
    if (data) {
      reset({
        name: data.beneficiary.name || '',
        email: data.beneficiary.email || '',
        phone: data.beneficiary.phone || '',
        document: data.beneficiary.document || '',
        documentType: data.beneficiary.documentType || '',
        birthdate: data.beneficiary.birthdate ? format(data.beneficiary.birthdate, 'dd/MM/yyyy') : '',
        type: data.beneficiary.type || '',
      })
    }
  }, [data, reset])

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      {loading ? (
        <DialogContent className='pt-12'>
          <BeneficiaryFormSkeleton />
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{data?.beneficiary.name}</DialogTitle>
          </DialogHeader>
          {loading ? <BeneficiaryFormSkeleton /> : <BeneficiaryForm register={register} control={control} />}
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
            <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleUpdateBeneficiary)}>
              Atualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
