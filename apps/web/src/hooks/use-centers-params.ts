import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export function useCenterParams() {
	const [params, setParams] = useQueryStates({
		centerId: parseAsString,
		createCenter: parseAsBoolean,
		deleteCenterId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
