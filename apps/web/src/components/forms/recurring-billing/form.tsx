'use client'

import { CATEGORIES } from '@/src/graphql/queries'
import { CENTERS } from '@/src/graphql/queries'
import { useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Calendar } from '@contecon/ui/components/calendar'
import { Label } from '@contecon/ui/components/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import { cn } from '@contecon/ui/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../../input-field'
import { SelectField } from '../../select-field'

export const recurringBillingSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	amount: z.number(),
	startDate: z.date(),
	endDate: z.date().optional(),
	isActive: z.boolean(),
	categoryId: z.string().optional(),
	centerId: z.string().optional(),
})

export type RecurringBillingPayload = z.infer<typeof recurringBillingSchema>

export function RecurringBillingForm({
	register,
	control,
}: {
	register: UseFormRegister<RecurringBillingPayload>
	control: Control<RecurringBillingPayload>
}) {
	const { data: costCenters } = useQuery(CENTERS)
	const { data: categories } = useQuery(CATEGORIES)

	return (
		<div className='grid grid-cols-3 gap-4 w-full'>
			<InputField
				name='name'
				type='text'
				label='Nome'
				placeholder='Nome da conta recorrente'
				register={register('name')}
			/>
			<InputField
				name='amount'
				type='number'
				label='Valor'
				placeholder='Valor da conta recorrente'
				register={register('amount')}
			/>
			<div className='col-span-3 grid grid-cols-3 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label>Data de início</Label>
					<Controller
						name='startDate'
						control={control}
						render={({ field: { value, onChange } }) => {
							return (
								<Popover modal>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'justify-start text-left font-normal',
												!value && 'text-muted-foreground',
											)}
										>
											<CalendarIcon />
											{value ? (
												format(value, 'PPP', {
													locale: ptBR,
												})
											) : (
												<span>DD/MM/AAAA</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={value ?? undefined}
											onSelect={onChange}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							)
						}}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Label>Data de término</Label>
					<Controller
						name='endDate'
						control={control}
						render={({ field: { value, onChange } }) => {
							return (
								<Popover modal>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'justify-start text-left font-normal',
												!value && 'text-muted-foreground',
											)}
										>
											<CalendarIcon />
											{value ? (
												format(value, 'PPP', {
													locale: ptBR,
												})
											) : (
												<span>DD/MM/AAAA</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											mode='single'
											selected={value ?? undefined}
											onSelect={onChange}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							)
						}}
					/>
				</div>
			</div>
			<SelectField
				label='Categoria'
				name='categoryId'
				control={control}
				options={
					categories?.categories.items.map((category) => ({
						label: category.name,
						value: category.id,
					})) || []
				}
				placeholder='Selecione a categoria'
			/>
			<SelectField
				label='Centro de custo'
				name='centerId'
				control={control}
				options={
					costCenters?.centers.items.map((center) => ({
						label: center.name,
						value: center.id,
					})) || []
				}
				placeholder='Selecione o centro de custo'
			/>
			<InputField
				textarea
				name='description'
				type='text'
				label='Descrição'
				placeholder='Descrição da conta recorrente'
				register={register('description')}
			/>
		</div>
	)
}
