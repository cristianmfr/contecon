import { RecurringBillingTable } from '@/src/components/tables/recurring-billings/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getRecurringBillingsAction } from './actions'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Contas recorrentes',
	}
}

export default async function RecurringBillsPage() {
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
