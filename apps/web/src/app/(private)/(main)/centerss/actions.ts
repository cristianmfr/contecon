import { getCenters } from '@/src/actions/get-centers'
import { query } from '@/src/lib/apollo-ssr-client'

export const getCentersAction = async () => {
	const { data: centers } = await query({
		query: getCenters,
		variables: { query: { skip: 0, take: 10 } },
	})

	return centers
}
