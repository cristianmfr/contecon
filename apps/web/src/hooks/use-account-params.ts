import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export const useAccountParams = () => {
	const [params, setParams] = useQueryStates({
		accountId: parseAsString,
		createAccount: parseAsBoolean,
		deleteAccountId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
