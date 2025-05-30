'use client'

import { CREATE_CENTER } from '@/src/graphql/mutations'
import { useCenterParams } from '@/src/hooks/use-centers-params'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { CenterForm, CenterPayload, centerSchema } from '../forms/centers/form'

export function CreateCenterDialog() {
	const { setParams, createCenter } = useCenterParams()

	const isOpen = Boolean(createCenter)

	const { register, handleSubmit, control } = useForm<CenterPayload>({
		resolver: zodResolver(centerSchema),
	})

	const [createCenterAction, { loading: mutationLoading }] = useMutation(
		CREATE_CENTER,
		{
			refetchQueries: ['getCenters'],
			onCompleted: () => {
				toast.success('Centro de custos foi criado com sucesso!')
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar o centro de custos.')
				console.error(err.message)
			},
		},
	)

	const handleCreateCenter = handleSubmit(async (data: CenterPayload) => {
		const { isActive, ...rest } = data

		const booleanStatus = isActive === 'true' ? true : false

		createCenterAction({
			variables: { data: { isActive: booleanStatus, ...rest } },
		})
	})

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo Centro de Custos</DialogTitle>
				</DialogHeader>
				<CenterForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button onClick={handleCreateCenter} loading={mutationLoading}>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
