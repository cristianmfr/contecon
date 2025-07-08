import { Schedule } from '@contecon/graphql/lib/graphql'
import { ScrollArea } from '@contecon/ui/components/scroll-area'

import { SchedulesInboxCard } from './card'

interface SchedulesItemsProps {
	schedules: Schedule[]
}

export const SchedulesItems = ({ schedules }: SchedulesItemsProps) => {
	return (
		<ScrollArea>
			<div className='flex flex-col gap-2'>
				{schedules.map((schedule, index) => (
					<SchedulesInboxCard
						key={index}
						name={schedule.name}
						description={schedule.description}
						startDate={schedule.startDate}
						endDate={schedule.endDate}
						identifierColor={schedule.identifierColor || '#FFFFFF'}
					/>
				))}
			</div>
		</ScrollArea>
	)
}
