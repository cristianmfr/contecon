'use client'

import { SCHEDULES } from '@/src/graphql/queries'
import { useQuery } from '@apollo/client'
import { Calendar } from '@contecon/ui/components/calendar'
import { SidebarMenu, SidebarMenuItem } from '@contecon/ui/components/sidebar'
import { LucideIcon } from 'lucide-react'

import { SchedulesInbox } from './schedules-inbox/inbox'

type SidebarMenuItem = {
	url: string
	label: string
	icon?: LucideIcon
}

export function CalendarMenuItems() {
	const { data } = useQuery(SCHEDULES)

	return (
		<SidebarMenu>
			<SidebarMenuItem className='px-2 py-1'>
				<span className='text-xs font-medium text-muted-foreground'>
					Agenda
				</span>
			</SidebarMenuItem>
			<Calendar />
			<SidebarMenuItem className='px-2 py-1'>
				<span className='text-xs font-medium text-muted-foreground'>Inbox</span>
			</SidebarMenuItem>
			<SchedulesInbox schedules={data?.schedules || []} />
		</SidebarMenu>
	)
}
