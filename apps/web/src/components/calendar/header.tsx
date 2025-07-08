import { CREATE_SCHEDULE } from '@/src/graphql/mutations'
import { useMutation } from '@apollo/client'
import { ScheduleType } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@contecon/ui/components/dialog'
import { Dialog } from '@contecon/ui/components/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import ScheduleForm, { scheduleFormSchema } from '../forms/schedule/form'
import { SchedulePayload } from '../forms/schedule/form'
import { PageTitle } from '../page-layout'

export default function CalendarHeader() {
	const [color, setColor] = useState('#FFFFFF')

	const [createSchedule] = useMutation(CREATE_SCHEDULE)

	const handleCreateSchedule = async (data: SchedulePayload) => {
		const {
			startDate,
			endDate,
			name,
			description,
			reminderDaysBefore,
			reminder,
		} = data

		const start = new Date(startDate)
		const end = new Date(endDate)

		const daysBefore = reminderDaysBefore ? Number(reminderDaysBefore) : 0
		const isReminder = reminder ? true : false

		await createSchedule({
			variables: {
				data: {
					name,
					description,
					identifierColor: color,
					reminderDaysBefore: daysBefore,
					reminder: isReminder,
					type: ScheduleType.OneTime,
					startDate: start,
					endDate: end,
					isActive: true,
				},
			},
		})
			.then(() => {
				toast.success('Agendamento criado com sucesso')
			})
			.catch((error) => {
				console.log(error.message)
				toast.error('Erro ao criar agendamento')
			})
	}

	const {
		register,
		getValues,
		setValue,
		control,
		formState: { errors },
	} = useForm<SchedulePayload>({
		resolver: zodResolver(scheduleFormSchema),
	})

	return (
		<div className='grid grid-cols-2 w-full'>
			<div className='flex flex-col gap-2'>
				<PageTitle>Agendamentos</PageTitle>
			</div>
			<div className='flex items-center gap-2 justify-end'>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='secondary'>
							<CalendarPlus2 />
							novo agendamento
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Novo agendamento</DialogTitle>
						</DialogHeader>
						<ScheduleForm
							setValue={setValue}
							register={register}
							setColor={setColor}
							color={color}
							errors={errors}
							control={control}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant='secondary'>Cancelar</Button>
							</DialogClose>
							<Button
								type='submit'
								onClick={() => handleCreateSchedule(getValues())}
							>
								Criar
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
