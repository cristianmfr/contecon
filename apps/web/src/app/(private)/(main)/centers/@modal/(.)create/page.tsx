'use client'

import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CenterForm, CenterPayload, centerSchema } from '@/src/components/forms/centers/form'
import { CREATE_CENTER } from '@/src/server/centers/create-center.mutation'

export default function CreateCenter() {
  const router = useRouter()

  const [createCenter, { loading }] = useMutation(CREATE_CENTER)

  const { register, handleSubmit, control } = useForm<CenterPayload>({
    resolver: zodResolver(centerSchema),
  })

  const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

  const handleCreateCenter = (data: CenterPayload) => {
    const { isActive, ...rest } = data

    const resolvedStatus = isActive === 'true'

    createCenter({
      variables: {
        data: {
          isActive: resolvedStatus,
          ...rest,
        },
      },
    })
      .then(() => {
        router.back()
        setShouldRefetch(true)
        toast.success('Centro de custo criado com sucesso')
      })
      .catch((err) => {
        toast.error('Erro ao criar centro de custo')
        console.error(err.message)
      })
  }

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Centro de Custo</DialogTitle>
        </DialogHeader>
        <CenterForm register={register} control={control} />
        <DialogFooter className='gap-2 justify-end'>
          <Button type='button' variant='secondary' disabled={loading} loading={loading} onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type='button' disabled={loading} loading={loading} onClick={handleSubmit(handleCreateCenter)}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
