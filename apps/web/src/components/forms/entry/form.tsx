'use client'

import { ACCOUNTS } from '@/src/graphql/queries'
import { BENEFICIARIES } from '@/src/graphql/queries'
import { CATEGORIES } from '@/src/graphql/queries'
import { CENTERS } from '@/src/graphql/queries'
import { resolveEntryTypeLabel } from '@/src/utils/resolve-entry-label'
import { resolveEntryStatusLabel } from '@/src/utils/resolve-entry-status-label'
import { useQuery } from '@apollo/client'
import { EntryStatus, EntryType } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import { Calendar } from '@contecon/ui/components/calendar'
import { Input } from '@contecon/ui/components/input'
import { Label } from '@contecon/ui/components/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@contecon/ui/components/select'
import { cn } from '@contecon/ui/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../../input-field'
import { SelectField } from '../../select-field'

export const entrySchema = z.object({
	type: z.string(),
	description: z.string().optional(),
	receiveFrom: z.string(),
	beneficiaryId: z.string().optional(),
	totalValue: z.number(),
	dueDate: z.date().optional().nullable(),
	offsetDate: z.date().optional().nullable(),
	paymentDate: z.date().optional().nullable(),
	status: z.string(),
	centerId: z.string().optional(),
	categoryId: z.string().optional(),
	accountId: z.string().optional(),
})

export type EntryPayload = z.infer<typeof entrySchema>

export function EntryForm({
	register,
	control,
}: {
	register: UseFormRegister<EntryPayload>
	control: Control<EntryPayload>
}) {
	const { data: beneficiaries } = useQuery(BENEFICIARIES)
	const { data: costCenters } = useQuery(CENTERS)
	const { data: categories } = useQuery(CATEGORIES)
	const { data: accounts } = useQuery(ACCOUNTS)

	return (
		<div className='grid grid-cols-3 gap-4 w-full'>
			<div className='col-span-3 grid grid-cols-2 gap-2'>
				<SelectField
					label='Tipo do Lançamento'
					name='type'
					control={control}
					options={Object.values(EntryType).map((type) => ({
						label: resolveEntryTypeLabel(type),
						value: type,
					}))}
					placeholder='Selecione o tipo do lançamento'
				/>
				<InputField
					name='description'
					label='Identificador'
					placeholder='Digite um identificador'
					register={register('description')}
				/>
			</div>
			<div className='grid grid-cols-2 col-span-3 gap-2'>
				<InputField
					name='receiveFrom'
					label='Nome de favorecido'
					placeholder='Digite o nome do recebedor'
					register={register('receiveFrom')}
				/>
				<SelectField
					label='Favorecido'
					name='beneficiaryId'
					control={control}
					options={
						beneficiaries?.beneficiaries.items.map((item) => ({
							label: item.name,
							value: item.id,
						})) ?? []
					}
					placeholder='Selecione o favorecido'
				/>
			</div>
			<div className='grid grid-cols-2 col-span-3 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label htmlFor='balance'>Valor Total</Label>
					<div className='grid w-full items-center gap-1.5'>
						<div className='relative'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<span className='text-sm text-muted-foreground'>R$</span>
							</div>
							<Input
								id='currency'
								type='number'
								min={0}
								step={0.01}
								placeholder='0.00'
								className='pl-9 [&::-webkit-inner-spin-button]:appearance-none'
								{...register('totalValue', { valueAsNumber: true })}
							/>
						</div>
					</div>
				</div>
				<SelectField
					label='Status'
					name='status'
					control={control}
					options={Object.values(EntryStatus).map((status) => ({
						label: resolveEntryStatusLabel(status),
						value: status,
					}))}
					placeholder='Selecione o status'
				/>
			</div>
			<div className='col-span-3 grid grid-cols-3 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label>Vencimento</Label>
					<Controller
						name='dueDate'
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
					<Label>Compensação</Label>
					<Controller
						name='offsetDate'
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
					<Label>Pagamento</Label>
					<Controller
						name='paymentDate'
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
			<div className='col-span-3 grid grid-cols-3 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label>Centro de custo</Label>
					<Controller
						name='centerId'
						control={control}
						render={({ field: { name, onChange, value, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={(value) => {
										onChange(value)
									}}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Selectione o centro de custo' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Centro de custo</SelectLabel>
											{costCenters?.centers.items.map((item, index) => (
												<SelectItem key={index} value={item.id}>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)
						}}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Label>Categoria</Label>
					<Controller
						name='categoryId'
						control={control}
						render={({ field: { name, value, onChange, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={(value) => {
										onChange(value)
									}}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className='w-full'>
										<SelectValue
											className='w-full'
											placeholder='Selectione o status'
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Categoria</SelectLabel>
											{categories?.categories.items.map((item, index) => (
												<SelectItem key={index} value={item.id}>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)
						}}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Label>Conta Financeira</Label>
					<Controller
						name='accountId'
						control={control}
						render={({ field: { name, value, onChange, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={(value) => {
										onChange(value)
									}}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Selectione o status' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Conta Financeira</SelectLabel>
											{accounts?.accounts.items.map((item, index) => (
												<SelectItem key={index} value={item.id}>
													{item.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)
						}}
					/>
				</div>
			</div>
		</div>
	)
}
