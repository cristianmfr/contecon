'use client'

import {
	EntryForm,
	EntryPayload,
	entrySchema,
} from '@/src/components/forms/entry/form'
import { UPDATE_ENTRY } from '@/src/graphql/mutations'
import { ENTRIES, ENTRY } from '@/src/graphql/queries'
import { useEntryParams } from '@/src/hooks/use-entry-params'
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

export function EntryUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, entryId } = useEntryParams()

	const isOpen = Boolean(entryId)

	const { register, handleSubmit, reset, control } = useForm<EntryPayload>({
		resolver: zodResolver(entrySchema),
	})

	const [updateEntryAction, { loading: mutationLoading }] = useMutation(
		UPDATE_ENTRY,
		{
			refetchQueries: [
				{
					query: ENTRIES,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Lançamento foi atualizado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar o lançamento.')
				console.error(err.message)
			},
		},
	)

	const handleUpdateEntry = handleSubmit(async (data: EntryPayload) => {
		updateEntryAction({
			variables: {
				data: {
					id: entryId!,
					...data,
				},
			},
		})
	})

	const [getEntry, { loading: entryLoading }] = useLazyQuery(ENTRY, {
		variables: {
			entryId: entryId!,
		},
		fetchPolicy: 'no-cache',
	})

	useEffect(() => {
		if (entryId) {
			getEntry().then(({ data }) => {
				reset({
					type: data?.entry.type || '',
					receiveFrom: data?.entry.receiveFrom || '',
					totalValue: data?.entry.totalValue || 0,
					status: data?.entry.status || '',
					description: data?.entry.description || '',
					beneficiaryId: data?.entry.beneficiary?.id || '',
					dueDate: data?.entry.dueDate || null,
					accountId: data?.entry.account?.id || '',
				})
			})
		}
	}, [getEntry, reset, entryId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar Lançamento</DialogTitle>
				</DialogHeader>
				<EntryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={entryLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateEntry}
						loading={entryLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
