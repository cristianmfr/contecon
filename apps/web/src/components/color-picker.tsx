'use client'

import { Button } from '@contecon/ui/components/button'
import { Input } from '@contecon/ui/components/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@contecon/ui/components/popover'
import { cn } from '@contecon/ui/lib/utils'
import { useMemo } from 'react'
import { HexColorPicker } from 'react-colorful'

export function ColorPicker({
	value,
	onChange,
}: {
	value: string
	onChange: (value: string) => void
}) {
	const parsedValue = useMemo(() => {
		return value || '#FFFFFF'
	}, [value])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className={cn('block')}
					size='xs'
					style={{
						backgroundColor: parsedValue,
					}}
					variant='color'
				></Button>
			</PopoverTrigger>
			<PopoverContent className='w-full flex flex-col gap-2 rounded-lg'>
				<HexColorPicker color={parsedValue} onChange={onChange} />
				<Input
					maxLength={7}
					onChange={(e) => {
						onChange(e?.currentTarget?.value)
					}}
					value={parsedValue}
				/>
			</PopoverContent>
		</Popover>
	)
}
