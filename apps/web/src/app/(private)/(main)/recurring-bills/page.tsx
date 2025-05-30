import { RecurringBillingTable } from '@/src/components/tables/recurring-billings/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getRecurringBillingsAction } from './actions'

type SearchParams = { [key: string]: string | undefined }

export async function generateMetadata({
	searchParams,
}: {
	searchParams: SearchParams
}): Promise<Metadata> {
	return {
		title: 'Contas recorrentes',
	}
}

export default async function RecurringBillsPage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { recurringBills } = await getRecurringBillingsAction()

	const revalidateRecurringBillingPath = async () => {
		'use server'

		revalidatePath('/recurring-bills', 'page')
	}

	return (
		<>
			<RecurringBillingTable
				recurringBilling={recurringBills.items}
				revalidateRecurringBillingPath={revalidateRecurringBillingPath}
			/>
		</>
	)
}
