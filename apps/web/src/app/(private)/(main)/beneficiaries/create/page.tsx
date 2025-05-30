'use client'

import { beneficiarySchema } from '@/src/components/forms/beneficiaries/form'
import { BeneficiaryPayload } from '@/src/components/forms/beneficiaries/form'
import { BeneficiaryForm } from '@/src/components/forms/beneficiaries/form'
import {
	BreadcrumbItem,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { CREATE_BENEFICIARY } from '@/src/server/beneficiaries/create-beneficiary.mutation'
import { convertStringToISO } from '@/src/utils/convert-string-to-iso'
import { useMutation } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const breadcrumbData: BreadcrumbItem[] = [
	{
		label: 'Dashboard',
		url: '/',
	},
	{
		label: 'Favorecidos',
		url: '/beneficiaries',
	},
	{
		label: 'Adicionar',
		url: '/beneficiaries/create',
	},
]

export default function CreateBeneficiary() {
	const router = useRouter()

	const [createBeneficiary, { loading }] = useMutation(CREATE_BENEFICIARY)

	const { register, handleSubmit, control } = useForm<BeneficiaryPayload>({
		resolver: zodResolver(beneficiarySchema),
	})

	const handleCreateBeneficiary = (data: BeneficiaryPayload) => {
		const { birthdate, ...rest } = data

		const dateToISO = birthdate ? convertStringToISO(birthdate) : null

		createBeneficiary({
			variables: {
				data: {
					...rest,
					birthdate: dateToISO,
				},
			},
		})
			.then(() => {
				router.push('/beneficiaries')
				toast.success('Favorecido criado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao criar favorecido')
				console.error(err.message)
			})
	}

	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>Adicionar Favorecido</PageTitle>
			</PageHeader>
			<Card>
				<CardContent>
					<BeneficiaryForm register={register} control={control} />
				</CardContent>
				<CardFooter className='gap-2 justify-end'>
					<Button
						type='button'
						variant='secondary'
						disabled={loading}
						loading={loading}
						onClick={() => router.back()}
					>
						Cancelar
					</Button>
					<Button
						type='button'
						disabled={loading}
						loading={loading}
						onClick={handleSubmit(handleCreateBeneficiary)}
					>
						Adicionar
					</Button>
				</CardFooter>
			</Card>
		</PageLayout>
	)
}
