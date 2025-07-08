import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '../../input-field'

export const createNewPasswordFormSchema = z.object({
	password: z
		.string()
		.min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
	confirmPassword: z
		.string()
		.min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
})

export type CreateNewPasswordFormSchemaType = z.infer<
	typeof createNewPasswordFormSchema
>

export interface CreateNewPasswordFormData {
	register: UseFormRegister<CreateNewPasswordFormSchemaType>
	errors: FieldErrors<CreateNewPasswordFormSchemaType>
}

export function CreateNewPasswordForm({
	register,
	errors,
}: CreateNewPasswordFormData) {
	return (
		<div className='grid gap-4'>
			<InputField
				name='password'
				type='password'
				label='Nova senha'
				placeholder='************'
				register={register('password')}
				error={errors.password?.message}
			/>
			<InputField
				type='password'
				name='confirmPassword'
				label='Confirmar senha'
				placeholder='************'
				register={register('confirmPassword')}
				error={errors.confirmPassword?.message}
			/>
		</div>
	)
}
