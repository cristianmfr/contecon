'use client'

import {
	EntryForm,
	EntryPayload,
	entrySchema,
} from '@/src/components/forms/entry/form'
import {
	BreadcrumbItem,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { CREATE_ENTRY } from '@/src/server/entries/create-entry.mutation'
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
		label: 'Lançamentos',
		url: '/entries',
	},
	{
		label: 'Adicionar',
		url: '/entries/create',
	},
]

export default function CreateEntry() {
	const router = useRouter()

	const [createEntry, { loading }] = useMutation(CREATE_ENTRY)

	const { register, handleSubmit, control } = useForm<EntryPayload>({
		resolver: zodResolver(entrySchema),
	})

	const handleCreateEntry = (data: EntryPayload) => {
		createEntry({
			variables: {
				data: {
					...data,
				},
			},
		})
			.then(() => {
				router.back()
				toast.success('Lançamento criado com sucesso')
			})
			.catch((err) => {
				toast.error('Erro ao criar lançamento')
				console.error(err.message)
			})
	}

	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>Adicionar lançamento</PageTitle>
			</PageHeader>
			<Card>
				<CardContent>
					<EntryForm register={register} control={control} />
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
						onClick={handleSubmit(handleCreateEntry)}
					>
						Adicionar
					</Button>
				</CardFooter>
			</Card>
		</PageLayout>
	)
}
