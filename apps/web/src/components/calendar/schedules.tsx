'use client'

import { SCHEDULES } from '@/src/graphql/queries'
import { useQuery } from '@apollo/client'
import { Card, CardContent } from '@contecon/ui/components/card'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { PageLayout } from '../page-layout'
import {
	Calendar,
	CalendarCurrentDate,
	CalendarDayView,
	CalendarEvent,
	CalendarMonthView,
	CalendarNextTrigger,
	CalendarPrevTrigger,
	CalendarTodayTrigger,
	CalendarViewTrigger,
	CalendarWeekView,
	CalendarYearView,
} from './calendar'
import CalendarHeader from './header'
import CalendarSkeleton from './skeleton'

export default function Schedules() {
	const { data: schedules, loading } = useQuery(SCHEDULES)

	const calendarEvents: CalendarEvent[] =
		schedules?.schedules.map((schedule) => ({
			id: schedule.id,
			start: schedule.startDate,
			end: schedule.endDate,
			title: schedule.name,
			identifierColor: schedule.identifierColor || '#FFFFFF',
			description: schedule.description,
		})) || []

	const handleEventClick = (eventId: string) => {
		console.log(eventId)
	}

	if (loading) {
		return <CalendarSkeleton />
	}

	return (
		<PageLayout>
			<CalendarHeader />
			<div className='flex flex-col w-full h-full gap-4'>
				<Card className='h-full'>
					<CardContent className='h-full'>
						<Calendar locale={ptBR} events={calendarEvents}>
							<div className='flex flex-col h-full'>
								<div className='flex px-6 items-center gap-2 mb-6'>
									<CalendarViewTrigger
										className='aria-[current=true]:bg-accent'
										view='day'
									>
										Dia
									</CalendarViewTrigger>
									<CalendarViewTrigger
										view='week'
										className='aria-[current=true]:bg-accent'
									>
										Semana
									</CalendarViewTrigger>
									<CalendarViewTrigger
										view='month'
										className='aria-[current=true]:bg-accent'
									>
										Mês
									</CalendarViewTrigger>
									<CalendarViewTrigger
										view='year'
										className='aria-[current=true]:bg-accent'
									>
										Ano
									</CalendarViewTrigger>

									<span className='flex-1' />

									<CalendarCurrentDate />

									<CalendarPrevTrigger>
										<ChevronLeft size={20} />
										<span className='sr-only'>Voltar</span>
									</CalendarPrevTrigger>

									<CalendarTodayTrigger>Hoje</CalendarTodayTrigger>

									<CalendarNextTrigger>
										<ChevronRight size={20} />
										<span className='sr-only'>Próximo</span>
									</CalendarNextTrigger>
								</div>

								<div className='flex-1 px-6 overflow-hidden'>
									<CalendarDayView />
									<CalendarWeekView />
									<CalendarMonthView onEventClick={handleEventClick} />
									<CalendarYearView />
								</div>
							</div>
						</Calendar>
					</CardContent>
				</Card>
			</div>
		</PageLayout>
	)
}
