import { BENEFICIARIES, BENEFICIARY } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getBeneficiariesAction = async () => {
	const { data: beneficiaries } = await query({
		query: BENEFICIARIES,
		variables: { query: { skip: 0, take: 10 } },
	})

	return beneficiaries
}

export const getBeneficiaryAction = async (beneficiaryId: string) => {
	const { data: beneficiary } = await query({
		query: BENEFICIARY,
		variables: {
			beneficiaryId,
		},
	})

	return beneficiary
}

export async function revalidateBeneficiariesPath() {
	'use server'

	revalidatePath('/beneficiaries', 'page')
}
