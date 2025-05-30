'use client'

import {
	CategoryForm,
	CategoryPayload,
	categorySchema,
} from '@/src/components/forms/categories/form'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CREATE_CATEGORY } from '@/src/server/categories/create-category.mutation'
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

export default function CreateCategory() {
	const router = useRouter()

	const [createCategory, { loading }] = useMutation(CREATE_CATEGORY)

	const { register, handleSubmit, control } = useForm<CategoryPayload>({
		resolver: zodResolver(categorySchema),
	})

	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const handleCreateCategory = (data: CategoryPayload) => {
		const { isActive, ...rest } = data

		const resolvedStatus = isActive === 'true'

		createCategory({
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
				toast.success('Categoria criada com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao criar categoria')
				console.error(err.message)
			})
	}

	return (
		<Dialog defaultOpen onOpenChange={() => router.back()}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar Categoria</DialogTitle>
				</DialogHeader>
				<CategoryForm register={register} control={control} />
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
						onClick={handleSubmit(handleCreateCategory)}
					>
						Adicionar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
