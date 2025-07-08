'use client'

import { CREATE_ENTRY } from '@/src/graphql/mutations'
import { ENTRIES } from '@/src/graphql/queries'
import { useEntryParams } from '@/src/hooks/use-entry-params'
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

import { EntryForm, EntryPayload, entrySchema } from '../forms/entry/form'

export function CreateEntryDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, createEntry } = useEntryParams()

	const isOpen = Boolean(createEntry)

	const { register, handleSubmit, control } = useForm<EntryPayload>({
		resolver: zodResolver(entrySchema),
	})

	const [createEntryAction, { loading: mutationLoading }] = useMutation(
		CREATE_ENTRY,
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
				toast.success('Lançamento foi criado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar o lançamento.')
				console.error(err.message)
			},
		},
	)

	const handleCreateEntry = handleSubmit(async (data: EntryPayload) => {
		const { ...rest } = data

		createEntryAction({
			variables: {
				data: {
					...rest,
				},
			},
		})
	})

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Novo lançamento</DialogTitle>
				</DialogHeader>
				<EntryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button onClick={handleCreateEntry} loading={mutationLoading}>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
