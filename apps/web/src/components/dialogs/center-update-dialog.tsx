'use client'

import {
	CenterForm,
	CenterPayload,
	centerSchema,
} from '@/src/components/forms/centers/form'
import { UPDATE_CENTER } from '@/src/graphql/mutations'
import { CENTER, CENTERS } from '@/src/graphql/queries'
import { useCenterParams } from '@/src/hooks/use-centers-params'
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

export function CenterUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, centerId } = useCenterParams()

	const isOpen = Boolean(centerId)

	const { register, handleSubmit, reset, control } = useForm<CenterPayload>({
		resolver: zodResolver(centerSchema),
	})

	const [updateCenterAction, { loading: mutationLoading }] = useMutation(
		UPDATE_CENTER,
		{
			refetchQueries: [
				{
					query: CENTERS,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Centro de custos foi atualizado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar o centro de custos.')
				console.error(err.message)
			},
		},
	)

	const handleUpdateCenter = handleSubmit(async (data: CenterPayload) => {
		const { isActive, ...rest } = data
		const payload = {
			id: centerId!,
			...rest,
			isActive: isActive === 'true' ? true : false,
		}

		updateCenterAction({
			variables: {
				data: payload,
			},
		})
	})

	const [getCenter, { loading: centerLoading }] = useLazyQuery(CENTER, {
		variables: {
			centerId: centerId!,
		},
		fetchPolicy: 'no-cache',
	})

	useEffect(() => {
		if (centerId) {
			getCenter().then(({ data }) => {
				reset({
					name: data?.center.name || '',
					description: data?.center.description || '',
					isActive: data?.center.isActive ? 'true' : 'false',
				})
			})
		}
	}, [getCenter, reset, centerId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar Centro de Custos</DialogTitle>
				</DialogHeader>
				<CenterForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={centerLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateCenter}
						loading={centerLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
