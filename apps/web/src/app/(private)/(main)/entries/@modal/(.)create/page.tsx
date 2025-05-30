'use client'

import {
	EntryForm,
	EntryPayload,
	entrySchema,
} from '@/src/components/forms/entry/form'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CREATE_ENTRY } from '@/src/server/entries/create-entry.mutation'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CreateEntry() {
	const router = useRouter()

	const [createEntry, { loading }] = useMutation(CREATE_ENTRY)

	const { register, handleSubmit, control } = useForm<EntryPayload>({
		resolver: zodResolver(entrySchema),
	})

	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const handleCreateEntry = (data: EntryPayload) => {
		const { status, ...rest } = data

		createEntry({
			variables: {
				data: {
					status,
					...rest,
				},
			},
		})
			.then(() => {
				router.back()
				setShouldRefetch(true)
				toast.success('Lançamento criado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao criar lançamento')
				console.error(err.message)
			})
	}

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Lançamento</DialogTitle>
				</DialogHeader>
				<EntryForm register={register} control={control} />
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
					<Button
						type='button'
						disabled={loading}
						loading={loading}
						onClick={handleSubmit(handleCreateEntry)}
					>
						Adicionar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
