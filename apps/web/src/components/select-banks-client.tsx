'use client'

import { Bank } from '@/src/server/http/get-brazil-banks'
import { Button } from '@contecon/ui/components/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@contecon/ui/components/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import { cn } from '@contecon/ui/lib/utils'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { AccountPayload } from './forms/account/form'

type Props = {
	banks: Bank[]
	setFormValue: UseFormSetValue<AccountPayload>
	isLoading?: boolean
	defaultValue?: string
}

export function SelectBanksClient({
	banks,
	setFormValue,
	isLoading = false,
	defaultValue,
}: Props) {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue)
		}
	}, [defaultValue])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-full justify-between'
				>
					{value ? (
						<span className='font-normal'>{value}</span>
					) : (
						<span className='text-muted-foreground font-normal'>
							Selecione um banco
						</span>
					)}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='min-w-full p-0'>
				{isLoading ? (
					<div className='flex items-center justify-center h-full'>
						<Loader2 className='h-4 w-4 animate-spin' />
					</div>
				) : (
					<Command>
						<CommandInput placeholder='Pesquisar banco' />
						<CommandList>
							<CommandEmpty>Nenhum banco encontrado.</CommandEmpty>
							<CommandGroup>
								{banks.map((bank, index) => (
									<CommandItem
										key={bank.code || `bank-${index}`}
										value={bank.name || `bank-${index}`}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? '' : currentValue)
											setFormValue('bank', bank.name || '')
											setOpen(false)
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												value === bank.code ? 'opacity-100' : 'opacity-0',
											)}
										/>
										{bank.code || '0'} - {bank.name}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				)}
			</PopoverContent>
		</Popover>
	)
}
