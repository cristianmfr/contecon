import { BeneficiaryType, DocumentType } from '@contecon/graphql/lib/graphql'
import { Label } from '@contecon/ui/components/label'
import { Select } from '@contecon/ui/components/select'
import { SelectLabel, SelectTrigger } from '@contecon/ui/components/select'
import { SelectItem, SelectValue } from '@contecon/ui/components/select'
import { SelectGroup } from '@contecon/ui/components/select'
import { SelectContent } from '@contecon/ui/components/select'
import { useState } from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'
import { withMask } from 'use-mask-input'
import { z } from 'zod'

import { InputField } from '../../input-field'
import { SelectField } from '../../select-field'

export const beneficiarySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	document: z.string(),
	documentType: z.string(),
	birthdate: z.string(),
	type: z.string(),
})

export type BeneficiaryPayload = z.infer<typeof beneficiarySchema>

export const BeneficiaryForm = ({
	register,
	control,
}: {
	register: UseFormRegister<BeneficiaryPayload>
	control: Control<BeneficiaryPayload>
}) => {
	const [selectedDocumentType, setSelectedDocumentType] =
		useState<string>('CPF')

	const resolveDocumentMask = (documentType: string) => {
		switch (documentType) {
			case DocumentType.Cpf:
				return '999.999.999-99'
			case DocumentType.Cnpj:
				return '99.999.999/9999-99'
			default:
				return ''
		}
	}

	return (
		<div className='grid gap-4 w-full'>
			<div className='grid grid-cols-3 gap-2'>
				<div className='col-span-2'>
					<InputField
						name='name'
						label='Nome do favorecido'
						placeholder='Digite o nome do favorecido'
						register={register('name')}
					/>
				</div>
				<SelectField
					name='type'
					label='Tipo de favorecido'
					placeholder='Selecione o tipo de favorecido'
					control={control}
					options={[
						{ label: 'Cliente', value: BeneficiaryType.Client },
						{ label: 'Fornecedor', value: BeneficiaryType.Supplier },
					]}
				/>
			</div>
			<InputField
				name='email'
				label='E-mail'
				placeholder='Digite o e-mail do favorecido'
				register={register('email')}
			/>
			<div className='grid grid-cols-2 gap-2'>
				<InputField
					name='birthdate'
					label='Data de nascimento'
					placeholder='00/00/0000'
					register={register('birthdate')}
					mask={withMask('99/99/9999')}
				/>
				<InputField
					name='phone'
					label='Telefone'
					placeholder='Digite o telefone do favorecido'
					register={register('phone')}
					mask={withMask('(99) 99999-9999')}
				/>
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<div className='col-span-1 flex flex-col gap-2'>
					<Label>Documento</Label>
					<Controller
						name='documentType'
						control={control}
						render={({ field: { name, onChange, value, disabled } }) => {
							return (
								<Select
									name={name}
									onValueChange={(value) => {
										onChange(value)
										setSelectedDocumentType(value)
									}}
									value={value}
									disabled={disabled}
								>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='CPF/CNPJ' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Tipo do documento</SelectLabel>
											<SelectItem value={DocumentType.Cpf}>CPF</SelectItem>
											<SelectItem value={DocumentType.Cnpj}>CNPJ</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							)
						}}
					/>
				</div>
				<InputField
					name='document'
					label='Número do documento'
					placeholder='Digite o número do documento'
					register={register('document')}
					mask={withMask(resolveDocumentMask(selectedDocumentType))}
				/>
			</div>
		</div>
	)
}
