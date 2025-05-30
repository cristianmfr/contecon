import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export const useRecurringBillingParams = () => {
	const [params, setParams] = useQueryStates({
		recurringBillingId: parseAsString,
		createRecurringBilling: parseAsBoolean,
		deleteRecurringBillingId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
