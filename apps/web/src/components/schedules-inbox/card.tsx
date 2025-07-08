import { Badge } from '@contecon/ui/components/badge'
import { Button } from '@contecon/ui/components/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil } from 'lucide-react'

export type InboxItem = {
	name: string
	description?: string
	startDate: string
	endDate: string
	identifierColor?: string
}

export function SchedulesInboxCard({
	name,
	description,
	startDate,
	endDate,
	identifierColor = '#fff',
}: InboxItem) {
	const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy HH:mm', {
		locale: ptBR,
	})
	const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy HH:mm', {
		locale: ptBR,
	})

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className='flex flex-col items-start cursor-pointer justify-center py-4 px-0 bg-card/80 hover:bg-card/100 transition-all duration-300 rounded-lg shadow-sm border border-border'>
					<div className='px-5 flex items-center gap-2'>
						<div
							className='size-2 rounded-full'
							style={{ backgroundColor: `${identifierColor}` }}
						/>
						<span className='text-xs font-medium text-center'>{name}</span>
					</div>
				</button>
			</PopoverTrigger>
			<PopoverContent className='w-64 rounded-lg px-1' side='right'>
				<div className='flex flex-col gap-2'>
					<div className='flex items-start justify-between pr-3'>
						<div className='flex flex-col gap-2 px-4 mt-auto'>
							<span className='text-xs font-medium'>{name}</span>
							<span className='text-xxs font-normal text-muted-foreground line-clamp-2'>
								{description}
							</span>
						</div>
						<Button variant='ghost' size='xs'>
							<Pencil className='size-3.5' />
						</Button>
					</div>
					<div className='px-3 mt-auto flex items-center gap-2'>
						<Badge
							variant='schedule'
							className='text-xxs font-semibold text-center'
						>
							{formattedStartDate.split(' ')[1] ===
							formattedEndDate.split(' ')[1]
								? formattedStartDate.split(' ')[1]
								: `${formattedStartDate.split(' ')[1]} - ${formattedEndDate.split(' ')[1]}`}
						</Badge>
						<Badge
							variant='schedule'
							className='text-xxs font-semibold text-center'
						>
							{formattedStartDate.split(' ')[0]}
						</Badge>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
