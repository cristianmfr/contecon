import { BeneficiaryCreateDialog } from '@/src/components/dialogs/beneficiary-create-dialog'
import { BeneficiaryUpdateDialog } from '@/src/components/dialogs/beneficiary-update-dialog'
import { BeneficiariesTable } from '@/src/components/tables/beneficiaries/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getBeneficiariesAction } from './actions'

type SearchParams = { [key: string]: string | undefined }

export async function generateMetadata({
	searchParams,
}: {
	searchParams: SearchParams
}): Promise<Metadata> {
	return {
		title: 'Favorecidos',
	}
}

export default async function BeneficiariesPage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { beneficiaries } = await getBeneficiariesAction()

	const revalidateCache = async () => {
		'use server'

		revalidatePath('/beneficiaries', 'page')
	}

	return (
		<>
			<BeneficiariesTable
				beneficiaries={beneficiaries.items}
				revalidateBeneficiariesPath={revalidateCache}
			/>

			<BeneficiaryCreateDialog onRevalidateCache={revalidateCache} />

			<BeneficiaryUpdateDialog onRevalidateCache={revalidateCache} />
		</>
	)
}
