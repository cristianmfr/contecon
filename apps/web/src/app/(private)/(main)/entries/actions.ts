import { ENTRIES } from '@/src/graphql/queries'
import { ENTRY } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getEntriesAction = async () => {
	const { data: entries } = await query({
		query: ENTRIES,
		variables: { query: { skip: 0, take: 10 } },
	})

	return entries
}

export const getEntryAction = async (entryId: string) => {
	const { data: entry } = await query({
		query: ENTRY,
		variables: {
			entryId,
		},
	})

	return entry
}

export async function revalidateEntriesPath() {
	'use server'

	revalidatePath('/entries', 'page')
}
