'use client'

import { Bank, getBrazilBanks } from '@/src/server/http/get-brazil-banks'
import { Input } from '@contecon/ui/components/input'
import { Label } from '@contecon/ui/components/label'
import { useEffect, useState } from 'react'
import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../../input-field'
import { SelectBanks } from '../../select-banks'
import { SelectField } from '../../select-field'

export const accountSchema = z.object({
	name: z.string(),
	bank: z.string(),
	description: z.string(),
	number: z.string(),
	agency: z.string(),
	type: z.string(),
	balance: z.number(),
	credit: z.number(),
})

export type AccountPayload = z.infer<typeof accountSchema>

export function AccountForm({
	register,
	control,
	setFormValue,
	defaultValue,
}: {
	register: UseFormRegister<AccountPayload>
	control: Control<AccountPayload>
	setFormValue: UseFormSetValue<AccountPayload>
	defaultValue?: string
}) {
	const [banks, setBanks] = useState<Bank[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchBanks = async () => {
			try {
				const banks = await getBrazilBanks()
				setBanks(banks)
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchBanks()
	}, [])

	return (
		<div className='flex flex-col w-full gap-4'>
			<InputField
				name='name'
				label='Nome'
				placeholder='Nome da conta financeira'
				register={register('name')}
			/>
			<SelectField
				name='type'
				label='Tipo de conta'
				placeholder='Selecione o tipo de conta'
				options={[
					{ label: 'Conta corrente', value: 'checking' },
					{ label: 'Conta poupança', value: 'savings' },
					{ label: 'Conta investimento', value: 'investment' },
					{ label: 'Cartão de crédito', value: 'credit_card' },
					{ label: 'Outro', value: 'other' },
				]}
				control={control}
			/>
			<div className='grid grid-cols-2 gap-2'>
				<InputField
					name='number'
					type='number'
					label='Número da conta'
					placeholder='000000000'
					register={register('number')}
				/>
				<InputField
					name='agency'
					type='number'
					label='Agência'
					placeholder='Número da agência'
					register={register('agency')}
				/>
			</div>
			<SelectBanks
				register={register('bank')}
				setFormValue={setFormValue}
				name='bank'
				banks={banks}
				isLoading={isLoading}
				defaultValue={defaultValue}
			/>
			<div className='grid grid-cols-2 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='balance'>Saldo Inicial</Label>
					<div className='grid w-full items-center gap-1.5'>
						<div className='relative'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<span className='text-sm text-muted-foreground'>R$</span>
							</div>
							<Input
								id='currency'
								type='number'
								min={0}
								max={10000}
								step={0.01}
								placeholder='0.00'
								className='pl-9 [&::-webkit-inner-spin-button]:appearance-none'
								{...register('balance', { valueAsNumber: true })}
							/>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='credit'>Crédito</Label>
					<div className='grid w-full items-center gap-1.5'>
						<div className='relative'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<span className='text-sm text-muted-foreground'>R$</span>
							</div>
							<Input
								id='currency'
								type='number'
								min={0}
								max={10000}
								step={0.01}
								placeholder='0.00'
								className='pl-9 [&::-webkit-inner-spin-button]:appearance-none'
								{...register('credit', { valueAsNumber: true })}
							/>
						</div>
					</div>
				</div>
			</div>
			<InputField
				textarea
				name='description'
				label='Descrição'
				placeholder='Descrição do centro de custos'
				register={register('description')}
			/>
		</div>
	)
}
