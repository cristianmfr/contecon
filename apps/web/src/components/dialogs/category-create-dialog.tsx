'use client'

import { CREATE_CATEGORY } from '@/src/graphql/mutations'
import { CATEGORIES } from '@/src/graphql/queries'
import { useCategoryParams } from '@/src/hooks/use-category-params'
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

import { categorySchema } from '../forms/categories/form'
import { CategoryForm, CategoryPayload } from '../forms/categories/form'

export function CategoryCreateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, createCategory } = useCategoryParams()

	const isOpen = Boolean(createCategory)

	const { register, handleSubmit, control } = useForm<CategoryPayload>({
		resolver: zodResolver(categorySchema),
	})

	const [createCategoryAction, { loading: mutationLoading }] = useMutation(
		CREATE_CATEGORY,
		{
			refetchQueries: [
				{
					query: CATEGORIES,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Categoria foi criada com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar a categoria.')
				console.error(err.message)
			},
		},
	)

	const handleCreateCategory = handleSubmit(async (data: CategoryPayload) => {
		createCategoryAction({
			variables: {
				data: {
					...data,
					isActive: data.isActive === 'true' ? true : false,
				},
			},
		})
	})

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova Categoria</DialogTitle>
				</DialogHeader>
				<CategoryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button onClick={handleCreateCategory} loading={mutationLoading}>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
