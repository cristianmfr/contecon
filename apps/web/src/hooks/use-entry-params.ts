import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export const useEntryParams = () => {
	const [params, setParams] = useQueryStates({
		entryId: parseAsString,
		createEntry: parseAsBoolean,
		deleteEntryId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
