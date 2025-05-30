'use client'

import {
	CenterForm,
	CenterPayload,
	centerSchema,
} from '@/src/components/forms/centers/form'
import {
	BreadcrumbItem,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { CREATE_CENTER } from '@/src/server/centers/create-center.mutation'
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
		label: 'Centros de custo',
		url: '/centers',
	},
	{
		label: 'Adicionar',
		url: '/centers/create',
	},
]

export default function CreateCenter() {
	const router = useRouter()

	const [createCenter, { loading }] = useMutation(CREATE_CENTER)

	const { register, handleSubmit, control } = useForm<CenterPayload>({
		resolver: zodResolver(centerSchema),
	})

	const handleCreateCenter = (data: CenterPayload) => {
		const { isActive, ...rest } = data

		const resolvedStatus = isActive === 'true'

		createCenter({
			variables: {
				data: {
					isActive: resolvedStatus,
					...rest,
				},
			},
		})
			.then(() => {
				router.back()
				toast.success('Centro de custo criado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao criar centro de custo')
				console.error(err.message)
			})
	}

	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>Adicionar Centro de Custo</PageTitle>
			</PageHeader>
			<Card>
				<CardContent>
					<CenterForm register={register} control={control} />
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
						onClick={handleSubmit(handleCreateCenter)}
					>
						Adicionar
					</Button>
				</CardFooter>
			</Card>
		</PageLayout>
	)
}
