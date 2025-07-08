import { RECURRING_BILL, RECURRING_BILLS } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getRecurringBillingsAction = async () => {
	const { data: recurringBillings } = await query({
		query: RECURRING_BILLS,
		variables: { query: { skip: 0, take: 10 } },
	})

	return recurringBillings
}

export const getRecurringBillingAction = async (recurringBillId: string) => {
	const { data: recurringBilling } = await query({
		query: RECURRING_BILL,
		variables: {
			recurringBillId,
		},
	})

	return recurringBilling
}

export async function revalidateRecurringBillingPath() {
	'use server'

	revalidatePath('/recurring-bills', 'page')
}
