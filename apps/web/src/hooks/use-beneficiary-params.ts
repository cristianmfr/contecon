import { useQueryStates } from 'nuqs'
import { parseAsBoolean, parseAsString } from 'nuqs/server'

export const useBeneficiaryParams = () => {
	const [params, setParams] = useQueryStates({
		beneficiaryId: parseAsString,
		createBeneficiary: parseAsBoolean,
		deleteBeneficiaryId: parseAsString,
	})

	return {
		...params,
		setParams,
	}
}
