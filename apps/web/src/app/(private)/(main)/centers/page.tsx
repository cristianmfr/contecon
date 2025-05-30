import { CreateCenterDialog } from '@/src/components/dialogs/center-create-dialog'
import { CenterUpdateDialog } from '@/src/components/dialogs/center-update-dialog'
import { CentersTable } from '@/src/components/tables/centers/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getCentersAction } from './actions'

type SearchParams = { [key: string]: string | undefined }

export async function generateMetadata({
	searchParams,
}: {
	searchParams: SearchParams
}): Promise<Metadata> {
	return {
		title: 'Centros de custos',
	}
}

export default async function CentersPage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { centers } = await getCentersAction()

	const revalidateCache = async () => {
		'use server'

		revalidatePath('/centerss', 'page')
	}

	return (
		<>
			<CentersTable
				centers={centers.items}
				revalidateCentersPath={revalidateCache}
			/>

			<CreateCenterDialog onRevalidateCache={revalidateCache} />

			<CenterUpdateDialog onRevalidateCache={revalidateCache} />
		</>
	)
}
