'use client'

import {
	CategoryForm,
	categorySchema,
} from '@/src/components/forms/categories/form'
import { UPDATE_CATEGORY } from '@/src/graphql/mutations'
import { CATEGORIES, CATEGORY } from '@/src/graphql/queries'
import { useCategoryParams } from '@/src/hooks/use-category-params'
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

import { CategoryPayload } from '../forms/categories/form'

export function CategoryUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, categoryId } = useCategoryParams()

	const isOpen = Boolean(categoryId)

	const { register, handleSubmit, reset, control } = useForm<CategoryPayload>({
		resolver: zodResolver(categorySchema),
	})

	const [updateCategoryAction, { loading: mutationLoading }] = useMutation(
		UPDATE_CATEGORY,
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
				toast.success('Categoria foi atualizada com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar a categoria.')
				console.error(err.message)
			},
		},
	)

	const handleUpdateCategory = handleSubmit(async (data: CategoryPayload) => {
		const { isActive, ...rest } = data
		const payload = {
			id: categoryId!,
			...rest,
			isActive: isActive === 'true' ? true : false,
		}

		updateCategoryAction({
			variables: {
				data: payload,
			},
		})
	})

	const [getCategory, { loading: categoryLoading }] = useLazyQuery(CATEGORY, {
		variables: {
			categoryId: categoryId!,
		},
		fetchPolicy: 'no-cache',
	})

	useEffect(() => {
		if (categoryId) {
			getCategory().then(({ data }) => {
				reset({
					name: data?.category.name || '',
					description: data?.category.description || '',
					isActive: data?.category.isActive ? 'true' : 'false',
				})
			})
		}
	}, [getCategory, reset, categoryId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar Categoria</DialogTitle>
				</DialogHeader>
				<CategoryForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={categoryLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateCategory}
						loading={categoryLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
