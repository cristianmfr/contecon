import { CENTER, CENTERS } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getCentersAction = async () => {
	const { data: centers } = await query({
		query: CENTERS,
		variables: { query: { skip: 0, take: 10 } },
	})

	return centers
}

export const getCenterAction = async (centerId: string) => {
	const { data: center } = await query({
		query: CENTER,
		variables: {
			centerId,
		},
	})

	return center
}

export async function revalidateCentersPath() {
	'use server'

	revalidatePath('/centers', 'page')
}
