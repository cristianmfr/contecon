'use client'

import { CREATE_BENEFICIARY } from '@/src/graphql/mutations'
import { BENEFICIARIES } from '@/src/graphql/queries'
import { useBeneficiaryParams } from '@/src/hooks/use-beneficiary-params'
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

import { beneficiarySchema } from '../forms/beneficiaries/form'
import { BeneficiaryPayload } from '../forms/beneficiaries/form'
import { BeneficiaryForm } from '../forms/beneficiaries/form'

export function BeneficiaryCreateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, createBeneficiary } = useBeneficiaryParams()

	const isOpen = Boolean(createBeneficiary)

	const { register, handleSubmit, control } = useForm<BeneficiaryPayload>({
		resolver: zodResolver(beneficiarySchema),
	})

	const [createBeneficiaryAction, { loading: mutationLoading }] = useMutation(
		CREATE_BENEFICIARY,
		{
			refetchQueries: [
				{
					query: BENEFICIARIES,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Favorecido foi criado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar o favorecido.')
				console.error(err.message)
			},
		},
	)

	const handleCreateBeneficiary = handleSubmit(
		async (data: BeneficiaryPayload) => {
			createBeneficiaryAction({
				variables: {
					data,
				},
			})
		},
	)

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo Favorecido</DialogTitle>
				</DialogHeader>
				<BeneficiaryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button onClick={handleCreateBeneficiary} loading={mutationLoading}>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
