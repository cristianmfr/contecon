'use client'

import { UPDATE_ACCOUNT } from '@/src/graphql/mutations'
import { ACCOUNT, ACCOUNTS } from '@/src/graphql/queries'
import { useAccountParams } from '@/src/hooks/use-account-params'
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
	AccountForm,
	AccountPayload,
	accountSchema,
} from '../forms/account/form'

export function AccountUpdateDialog({
	onRevalidateCache,
}: {
	onRevalidateCache: () => Promise<void>
}) {
	const { setParams, accountId } = useAccountParams()

	const isOpen = Boolean(accountId)

	const { register, handleSubmit, reset, control, setValue } =
		useForm<AccountPayload>({
			resolver: zodResolver(accountSchema),
		})

	const [updateAccountAction, { loading: mutationLoading }] = useMutation(
		UPDATE_ACCOUNT,
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
				toast.success('Conta financeira foi atualizada com sucesso!')
				await onRevalidateCache()
				setParams(null)
			},
			onError: (err) => {
				toast.error('Houve um erro ao atualizar a conta financeira.')
				console.error(err.message)
			},
		},
	)

	const handleUpdateAccount = handleSubmit(async (data: AccountPayload) => {
		const { ...rest } = data
		const payload = {
			id: accountId!,
			...rest,
		}

		updateAccountAction({
			variables: {
				data: payload,
			},
		})
	})

	const [getAccount, { loading: accountLoading }] = useLazyQuery(ACCOUNT, {
		variables: {
			accountId: accountId!,
		},
		fetchPolicy: 'no-cache',
	})

	useEffect(() => {
		if (accountId) {
			getAccount().then(({ data }) => {
				reset({
					name: data?.account.name || '',
					description: data?.account.description || '',
					agency: data?.account.agency || '',
					number: data?.account.number || '',
					type: data?.account.type || '',
					balance: data?.account.balance || 0,
					credit: data?.account.credit || 0,
				})
			})
		}
	}, [getAccount, reset, accountId])

	return (
		<Dialog open={isOpen} onOpenChange={() => setParams(null)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Atualizar conta financeira</DialogTitle>
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
						loading={accountLoading || mutationLoading}
					>
						Cancelar
					</Button>
					<Button
						onClick={handleUpdateAccount}
						loading={accountLoading || mutationLoading}
					>
						Atualizar
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
