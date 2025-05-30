'use client'

import { Button } from '@contecon/ui/components/button'
import { Calendar } from '@contecon/ui/components/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import { ScrollArea, ScrollBar } from '@contecon/ui/components/scroll-area'
import { cn } from '@contecon/ui/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface DateTimePickerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	onChangeCustom?: (value: Date) => void
}

export function DateTimePicker<T extends FieldValues>({
	control,
	name,
	onChangeCustom,
}: DateTimePickerProps<T>) {
	function handleDateSelect(date: Date | undefined) {
		if (date) {
			onChangeCustom?.(date)
		}
	}

	function handleTimeChange(type: 'hour' | 'minute', value: string) {
		const currentDate = new Date()
		const newDate = new Date(currentDate)

		if (type === 'hour') {
			const hour = parseInt(value, 10)
			newDate.setHours(hour)
		} else if (type === 'minute') {
			newDate.setMinutes(parseInt(value, 10))
		}

		onChangeCustom?.(newDate)
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value } }) => {
				return (
					<Popover modal>
						<PopoverTrigger asChild>
							<Button
								variant={'outline'}
								className={cn(
									'w-full pl-3 text-left font-normal',
									!value && 'text-muted-foreground',
								)}
							>
								{value ? (
									format(value, 'dd/MM/yyyy HH:mm', { locale: ptBR })
								) : (
									<span>DD/MM/AAAA</span>
								)}
								<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<div className='sm:flex'>
								<Calendar
									mode='single'
									selected={value}
									onSelect={handleDateSelect}
									initialFocus
								/>
								<div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
									<ScrollArea className='w-64 sm:w-auto'>
										<div className='flex sm:flex-col p-2'>
											{Array.from({ length: 24 }, (_, i) => i)
												.reverse()
												.map((hour) => (
													<Button
														key={hour}
														size='icon'
														variant={
															value && value.getHours() === hour
																? 'default'
																: 'ghost'
														}
														className='sm:w-full shrink-0 aspect-square'
														onClick={() =>
															handleTimeChange('hour', hour.toString())
														}
													>
														{hour}
													</Button>
												))}
										</div>
										<ScrollBar orientation='horizontal' className='sm:hidden' />
									</ScrollArea>
									<ScrollArea className='w-64 sm:w-auto'>
										<div className='flex sm:flex-col p-2'>
											{Array.from({ length: 12 }, (_, i) => i * 5).map(
												(minute) => (
													<Button
														key={minute}
														size='icon'
														variant={
															value && value.getMinutes() === minute
																? 'default'
																: 'ghost'
														}
														className='sm:w-full shrink-0 aspect-square'
														onClick={() =>
															handleTimeChange('minute', minute.toString())
														}
													>
														{minute.toString().padStart(2, '0')}
													</Button>
												),
											)}
										</div>
										<ScrollBar orientation='horizontal' className='sm:hidden' />
									</ScrollArea>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				)
			}}
		/>
	)
}
