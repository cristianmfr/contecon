import { Bank } from '@/src/server/http/get-brazil-banks'
import { Input } from '@contecon/ui/components/input'
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form'

import { AccountPayload } from './forms/account/form'
import { SelectBanksClient } from './select-banks-client'

type Props = {
	name: string
	register: UseFormRegisterReturn
	setFormValue: UseFormSetValue<AccountPayload>
	banks?: Bank[]
	isLoading?: boolean
	defaultValue?: string
}

export function SelectBanks({
	register,
	setFormValue,
	name,
	banks = [],
	isLoading = false,
	defaultValue,
}: Props) {
	if (!isLoading && (!banks || banks.length === 0)) {
		return (
			<Input placeholder='Digite o nome do banco' {...register} name={name} />
		)
	}

	return (
		<SelectBanksClient
			banks={banks}
			setFormValue={setFormValue}
			defaultValue={defaultValue}
		/>
	)
}
