import { Schedule } from '@contecon/graphql/lib/graphql'

import { SchedulesItems } from './data'

interface SchedulesInboxProps {
	schedules: Schedule[]
}

export function SchedulesInbox({ schedules }: SchedulesInboxProps) {
	return (
		<div className='grid gap-2'>
			<SchedulesItems schedules={schedules} />
		</div>
	)
}
