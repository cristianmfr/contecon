'use client'

import { UPDATE_RECURRING_BILL } from '@/src/graphql/mutations'
import { RECURRING_BILL, RECURRING_BILLS } from '@/src/graphql/queries'
import { useRecurringBillingParams } from '@/src/hooks/use-recurring-billing-params'
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

import {
	RecurringBillingForm,
	RecurringBillingPayload,
	recurringBillingSchema,
} from '../forms/recurring-billing/form'

export function RecurringBillingUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, recurringBillingId } = useRecurringBillingParams()

	const isOpen = Boolean(recurringBillingId)

	const { register, handleSubmit, reset, control } =
		useForm<RecurringBillingPayload>({
			resolver: zodResolver(recurringBillingSchema),
		})

	const [updateRecurringBillingAction, { loading: mutationLoading }] =
		useMutation(UPDATE_RECURRING_BILL, {
			refetchQueries: [
				{
					query: RECURRING_BILLS,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Conta recorrente foi atualizada com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar a conta recorrente.')
				console.error(err.message)
			},
		})

	const handleUpdateRecurringBilling = handleSubmit(
		async (data: RecurringBillingPayload) => {
			const { ...rest } = data
			const payload = {
				id: recurringBillingId!,
				...rest,
			}

			updateRecurringBillingAction({
				variables: {
					data: payload,
				},
			})
		},
	)

	const [getRecurringBilling, { loading: recurringBillingLoading }] =
		useLazyQuery(RECURRING_BILL, {
			variables: {
				recurringBillingId: recurringBillingId!,
			},
			fetchPolicy: 'no-cache',
		})

	useEffect(() => {
		if (recurringBillingId) {
			getRecurringBilling().then(({ data }) => {
				reset({
					name: data?.recurringBill.name || '',
					description: data?.recurringBill.description || '',
					amount: data?.recurringBill.amount || 0,
					startDate: data?.recurringBill.startDate || new Date(),
					endDate: data?.recurringBill.endDate || new Date(),
					isActive: data?.recurringBill.isActive || false,
					categoryId: data?.recurringBill.category?.id || '',
					centerId: data?.recurringBill.center?.id || '',
				})
			})
		}
	}, [getRecurringBilling, reset, recurringBillingId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar conta recorrente</DialogTitle>
				</DialogHeader>
				<RecurringBillingForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={recurringBillingLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateRecurringBilling}
						loading={recurringBillingLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
