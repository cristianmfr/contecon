'use client'

import {
	BeneficiaryForm,
	BeneficiaryPayload,
	beneficiarySchema,
} from '@/src/components/forms/beneficiaries/form'
import { BeneficiaryFormSkeleton } from '@/src/components/forms/beneficiaries/skeleton'
import { PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
import { BreadcrumbItem } from '@/src/components/page-layout'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { BENEFICIARY } from '@/src/server/beneficiaries/beneficiary.query'
import { UPDATE_BENEFICIARY } from '@/src/server/beneficiaries/update-beneficiary.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function BeneficiaryDetails({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const router = useRouter()

	const actualParams = React.use(params)
	const beneficiaryId = actualParams.id

	const { data } = useQuery(BENEFICIARY, {
		variables: {
			id: beneficiaryId,
		},
	})

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
			label: `${data?.beneficiary.name}`,
			url: '/beneficiaries/create',
		},
	]

	const [updateBeneficiary, { loading }] = useMutation(UPDATE_BENEFICIARY)

	const { register, handleSubmit, reset, control } =
		useForm<BeneficiaryPayload>({
			resolver: zodResolver(beneficiarySchema),
		})

	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const handleUpdateBeneficiary = (data: BeneficiaryPayload) => {
		updateBeneficiary({
			variables: {
				data: {
					id: beneficiaryId,
					...data,
				},
			},
		})
			.then(() => {
				router.back()
				setShouldRefetch(true)
				toast.success('Favorecido atualizado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao atualizar favorecido')
				console.error(err.message)
			})
	}

	useEffect(() => {
		if (data) {
			reset({
				name: data.beneficiary.name || '',
				email: data.beneficiary.email || '',
				phone: data.beneficiary.phone || '',
				document: data.beneficiary.document || '',
				documentType: data.beneficiary.documentType || '',
				birthdate: data.beneficiary.birthdate
					? format(data.beneficiary.birthdate, 'dd/MM/yyyy')
					: '',
				type: data.beneficiary.type || '',
			})
		}
	}, [data, reset])

	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>{data?.beneficiary.name}</PageTitle>
			</PageHeader>
			<Card>
				{loading ? (
					<CardContent>
						<BeneficiaryFormSkeleton />
					</CardContent>
				) : (
					<CardContent>
						<BeneficiaryForm register={register} control={control} />
					</CardContent>
				)}
				{!loading && (
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
							onClick={handleSubmit(handleUpdateBeneficiary)}
						>
							Atualizar
						</Button>
					</CardFooter>
				)}
			</Card>
		</PageLayout>
	)
}
