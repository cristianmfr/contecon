import { CreateEntryDialog } from '@/src/components/dialogs/entry-create-dialog'
import { EntryUpdateDialog } from '@/src/components/dialogs/entry-update-dialog'
import { EntriesTable } from '@/src/components/tables/entries/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getEntriesAction } from './actions'

type SearchParams = { [key: string]: string | undefined }

export async function generateMetadata({
	searchParams,
}: {
	searchParams: SearchParams
}): Promise<Metadata> {
	return {
		title: 'Lançamentos',
	}
}

export default async function EntriesPage({
	searchParams,
}: {
	searchParams: SearchParams
}) {
	const { entries } = await getEntriesAction()

	const revalidateCache = async () => {
		'use server'

		revalidatePath('/entries', 'page')
	}

	return (
		<>
			<EntriesTable
				entries={entries.items}
				revalidateEntriesPath={revalidateCache}
			/>

			<CreateEntryDialog onRevalidateCache={revalidateCache} />
			<EntryUpdateDialog onRevalidateCache={revalidateCache} />
		</>
	)
}
