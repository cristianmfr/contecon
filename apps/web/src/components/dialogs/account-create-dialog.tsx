'use client'

import { CREATE_ACCOUNT } from '@/src/graphql/mutations'
import { ACCOUNTS } from '@/src/graphql/queries'
import { useAccountParams } from '@/src/hooks/use-account-params'
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
	AccountForm,
	AccountPayload,
	accountSchema,
} from '../forms/account/form'

export function AccountCreateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, createAccount } = useAccountParams()

	const isOpen = Boolean(createAccount)

	const { register, handleSubmit, control, setValue } = useForm<AccountPayload>(
		{
			resolver: zodResolver(accountSchema),
		},
	)

	const [createAccountAction, { loading: mutationLoading }] = useMutation(
		CREATE_ACCOUNT,
		{
			refetchQueries: [
				{
					query: ACCOUNTS,
					variables: {
						query: {
							skip: 0,
							take: 10,
						},
					},
				},
			],
			onCompleted: async () => {
				toast.success('Favorecido foi criado com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao criar a conta financeira.')
				console.error(err.message)
			},
		},
	)

	const handleCreateAccount = handleSubmit(async (data: AccountPayload) => {
		const { ...rest } = data

		createAccountAction({
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
					<DialogTitle>Nova conta financeira</DialogTitle>
				</DialogHeader>
				<AccountForm
					register={register}
					control={control}
					setFormValue={setValue}
				/>
				<div className='grid grid-cols-2 gap-2'>
					<Button
						variant='secondary'
						onClick={() => setParams(null)}
						loading={mutationLoading}
					>
						Cancelar
					</Button>
					<Button onClick={handleCreateAccount} loading={mutationLoading}>
						Adicionar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
