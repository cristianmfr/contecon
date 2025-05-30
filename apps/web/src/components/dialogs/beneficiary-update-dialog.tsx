'use client'

import {
	BeneficiaryForm,
	beneficiarySchema,
} from '@/src/components/forms/beneficiaries/form'
import { UPDATE_BENEFICIARY } from '@/src/graphql/mutations'
import { BENEFICIARIES, BENEFICIARY } from '@/src/graphql/queries'
import { useBeneficiaryParams } from '@/src/hooks/use-beneficiary-params'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { BeneficiaryPayload } from '../forms/beneficiaries/form'

export function BeneficiaryUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, beneficiaryId } = useBeneficiaryParams()

	const isOpen = Boolean(beneficiaryId)

	const { register, handleSubmit, reset, control } =
		useForm<BeneficiaryPayload>({
			resolver: zodResolver(beneficiarySchema),
		})

	const [updateBeneficiaryAction, { loading: mutationLoading }] = useMutation(
		UPDATE_BENEFICIARY,
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
				toast.success('Favorecido foi atualizado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar o favorecido.')
				console.error(err.message)
			},
		},
	)

	const handleUpdateBeneficiary = handleSubmit(
		async (data: BeneficiaryPayload) => {
			updateBeneficiaryAction({
				variables: {
					data: {
						id: beneficiaryId!,
						...data,
					},
				},
			})
		},
	)

	const [getBeneficiary, { loading: beneficiaryLoading }] = useLazyQuery(
		BENEFICIARY,
		{
			variables: {
				beneficiaryId: beneficiaryId!,
			},
			fetchPolicy: 'no-cache',
		},
	)

	useEffect(() => {
		if (beneficiaryId) {
			getBeneficiary().then(({ data }) => {
				reset({
					name: data?.beneficiary.name || '',
					email: data?.beneficiary.email || '',
					phone: data?.beneficiary.phone || '',
					document: data?.beneficiary.document || '',
				})
			})
		}
	}, [getBeneficiary, reset, beneficiaryId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar Favorecido</DialogTitle>
				</DialogHeader>
				<BeneficiaryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={beneficiaryLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateBeneficiary}
						loading={beneficiaryLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
