import { Label } from '@contecon/ui/components/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@contecon/ui/components/select'
import { cn } from '@contecon/ui/lib/utils'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface SelectFieldProps<T extends FieldValues> {
	name: Path<T>
	placeholder: string
	label: string
	control: Control<T>
	options: {
		value: string
		label: string
	}[]
	onChangeCustom?: (value: string) => void
	className?: string
	disabled?: boolean
	defaultValue?: string
}

export function SelectField<T extends FieldValues>({
	name,
	placeholder,
	label,
	control,
	options,
	onChangeCustom,
	className,
	disabled = false,
	defaultValue,
}: SelectFieldProps<T>) {
	return (
		<div className={cn(className, 'flex flex-col gap-2')}>
			{label && <Label>{label}</Label>}
			<Controller
				name={name}
				control={control}
				disabled={disabled}
				render={({ field: { name, onChange, value, disabled } }) => (
					<Select
						name={name}
						defaultValue={defaultValue}
						onValueChange={(val) => {
							onChange(val)
							if (onChangeCustom) onChangeCustom(val)
						}}
						value={value}
						disabled={disabled}
					>
						<SelectTrigger className='w-full'>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{options.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			/>
		</div>
	)
}
