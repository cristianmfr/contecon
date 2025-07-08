'use client'

import { CREATE_RECURRING_BILL } from '@/src/graphql/mutations'
import { RECURRING_BILLS } from '@/src/graphql/queries'
import { useRecurringBillingParams } from '@/src/hooks/use-recurring-billing-params'
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

import {
	RecurringBillingPayload,
	recurringBillingSchema,
} from '../forms/recurring-billing/form'
import { RecurringBillingForm } from '../forms/recurring-billing/form'

export function RecurringBillingCreateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, createRecurringBilling } = useRecurringBillingParams()

	const isOpen = Boolean(createRecurringBilling)

	const { register, handleSubmit, control } = useForm<RecurringBillingPayload>({
		resolver: zodResolver(recurringBillingSchema),
	})

	const [createRecurringBillingAction, { loading: mutationLoading }] =
		useMutation(CREATE_RECURRING_BILL, {
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
				toast.success('Conta recorrente foi criada com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar a conta recorrente.')
				console.error(err.message)
			},
		})

	const handleCreateRecurringBilling = handleSubmit(
		async (data: RecurringBillingPayload) => {
			createRecurringBillingAction({
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
					<DialogTitle>Nova conta financeira</DialogTitle>
				</DialogHeader>
				<RecurringBillingForm register={register} control={control} />
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleCreateRecurringBilling}
						loading={mutationLoading}
					>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
