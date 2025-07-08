import { Label } from '@contecon/ui/components/label'
import {
	Control,
	FieldErrors,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'
import { z } from 'zod'

import { ColorPicker } from '../../color-picker'
import { DateTimePicker } from '../../date-time-picker'
import { InputField } from '../../input-field'
import { SelectField } from '../../select-field'

export const scheduleFormSchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	startDate: z.date(),
	endDate: z.date(),
	reminder: z.boolean().optional(),
	reminderDaysBefore: z.number().optional(),
})

export type SchedulePayload = z.infer<typeof scheduleFormSchema>

export default function ScheduleForm({
	register,
	setColor,
	color,
	setValue,
	control,
}: {
	register: UseFormRegister<SchedulePayload>
	errors: FieldErrors<SchedulePayload>
	setColor: (color: string) => void
	color: string
	setValue: UseFormSetValue<SchedulePayload>
	control: Control<SchedulePayload>
}) {
	return (
		<div className='grid gap-4 w-full'>
			<div className='flex flex-col gap-2'>
				<Label>Nome do agendamento</Label>
				<div className='flex items-center gap-4'>
					<InputField
						name='name'
						placeholder='Nome do agendamento'
						register={register('name')}
					/>
					<ColorPicker value={color} onChange={setColor} />
				</div>
			</div>
			<div className='grid grid-cols-3 gap-2'>
				<div className='flex flex-col gap-2'>
					<Label>Início</Label>
					<DateTimePicker
						name='startDate'
						control={control}
						onChangeCustom={(date) => setValue('startDate', date)}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<Label>Término</Label>
					<DateTimePicker
						name='endDate'
						control={control}
						onChangeCustom={(date) => setValue('endDate', date)}
					/>
				</div>
				<SelectField
					name='reminderDaysBefore'
					label='Alerta'
					placeholder='Não'
					control={control}
					defaultValue='no_data'
					options={[
						{ value: 'no_data', label: 'Não' },
						{ value: '1', label: '1 dia antes' },
						{ value: '3', label: '3 dias antes' },
						{ value: '5', label: '5 dias antes' },
						{ value: '7', label: '7 dias antes' },
						{ value: '10', label: '10 dias antes' },
						{ value: '15', label: '15 dias antes' },
						{ value: '30', label: '30 dias antes' },
					]}
				/>
			</div>
			<InputField
				textarea
				name='description'
				label='Descrição'
				placeholder='Descrição do agendamento'
				register={register('description')}
			/>
		</div>
	)
}
