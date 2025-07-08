import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export function useCategoryParams() {
	const [params, setParams] = useQueryStates({
		categoryId: parseAsString,
		createCategory: parseAsBoolean,
		deleteCategoryId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
