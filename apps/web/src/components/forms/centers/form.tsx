'use client'

import { Control, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../../input-field'
import { SelectField } from '../../select-field'

export const centerSchema = z.object({
	name: z.string(),
	description: z.string(),
	isActive: z.string(),
})

export type CenterPayload = z.infer<typeof centerSchema>

export const CenterForm = ({
	register,
	control,
}: {
	register: UseFormRegister<CenterPayload>
	control: Control<CenterPayload>
}) => {
	return (
		<div className='grid w-full gap-4'>
			<div className='grid grid-cols-5 gap-2'>
				<div className='col-span-3'>
					<InputField
						name='name'
						type='text'
						label='Nome'
						placeholder='Nome do centro de custo'
						register={register('name')}
					/>
				</div>
				<div className='col-span-2'>
					<SelectField
						name='isActive'
						label='Status'
						placeholder='Ativo/Desativado'
						control={control}
						options={[
							{
								label: 'Ativo',
								value: 'true',
							},
							{
								label: 'Desativado',
								value: 'false',
							},
						]}
					/>
				</div>
			</div>
			<InputField
				textarea
				name='description'
				type='text'
				label='Descrição'
				placeholder='Descrição do centro de custo'
				register={register('description')}
			/>
		</div>
	)
}
