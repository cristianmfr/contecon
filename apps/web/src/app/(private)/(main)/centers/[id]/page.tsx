'use client'

import {
	CenterForm,
	CenterPayload,
	centerSchema,
} from '@/src/components/forms/centers/form'
import { CenterFormSkeleton } from '@/src/components/forms/centers/skeleton'
import { PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'
import { BreadcrumbItem } from '@/src/components/page-layout'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { CENTER } from '@/src/server/centers/center.query'
import { UPDATE_CENTER } from '@/src/server/centers/update-center.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function CenterDetails({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const router = useRouter()

	const actualParams = React.use(params)
	const centerId = actualParams.id

	const { data } = useQuery(CENTER, {
		variables: {
			centerId,
		},
	})

	const breadcrumbData: BreadcrumbItem[] = [
		{
			label: 'Dashboard',
			url: '/',
		},
		{
			label: 'Centros de custo',
			url: '/centers',
		},
		{
			label: `${data?.center.name}`,
			url: '/centers/create',
		},
	]

	const [updateCenter, { loading }] = useMutation(UPDATE_CENTER)

	const { register, handleSubmit, reset, control } = useForm<CenterPayload>({
		resolver: zodResolver(centerSchema),
	})

	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const handleUpdateCenter = (data: CenterPayload) => {
		const { isActive, ...rest } = data

		const resolvedStatus = isActive === 'true'

		updateCenter({
			variables: {
				data: {
					id: centerId,
					isActive: resolvedStatus,
					...rest,
				},
			},
		})
			.then(() => {
				router.back()
				setShouldRefetch(true)
				toast.success('Centro de custo atualizado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao atualizar centro de custo')
				console.error(err.message)
			})
	}

	useEffect(() => {
		if (data) {
			reset({
				name: data.center.name || '',
				description: data.center.description || '',
				isActive: data.center.isActive ? 'true' : 'false',
			})
		}
	}, [data, reset])

	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>{data?.center.name}</PageTitle>
			</PageHeader>
			<Card>
				<CardContent>
					{loading ? (
						<CenterFormSkeleton />
					) : (
						<CenterForm register={register} control={control} />
					)}
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
						onClick={handleSubmit(handleUpdateCenter)}
					>
						Atualizar
					</Button>
				</CardFooter>
			</Card>
		</PageLayout>
	)
}
