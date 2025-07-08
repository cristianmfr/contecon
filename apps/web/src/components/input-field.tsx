import { Input } from '@contecon/ui/components/input'
import { Label } from '@contecon/ui/components/label'
import { Textarea } from '@contecon/ui/components/textarea'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputFieldProps {
	name: string
	textarea?: boolean
	readOnly?: boolean
	type?: 'text' | 'email' | 'password' | 'number'
	label?: string
	placeholder?: string
	register: UseFormRegisterReturn
	mask?: (target: HTMLInputElement) => void
	error?: string
}

export function InputField({
	name,
	type,
	label,
	placeholder,
	register,
	textarea = false,
	mask,
	readOnly = false,
	error,
}: InputFieldProps) {
	const inputProps = mask
		? {
				...register,
				onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
					mask(e.target)
					if (register.onChange) register.onChange(e)
				},
			}
		: register

	return (
		<div className='flex flex-col gap-2 w-full'>
			{label && <Label>{label}</Label>}
			{textarea ? (
				<Textarea id={name} placeholder={placeholder} {...register} />
			) : (
				<Input
					id={name}
					type={type}
					readOnly={readOnly}
					placeholder={placeholder}
					{...inputProps}
				/>
			)}
			{error && <p className='text-sm text-red-500'>{error}</p>}
		</div>
	)
}
