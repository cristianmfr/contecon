import { AccountCreateDialog } from '@/src/components/dialogs/account-create-dialog'
import { AccountUpdateDialog } from '@/src/components/dialogs/account-update-dialog'
import { AccountsTable } from '@/src/components/tables/accounts/data-table'
import { Metadata } from 'next'
import { revalidatePath } from 'next/cache'

import { getAccountsAction } from './actions'

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Contas financeiras',
	}
}

export default async function AccountsPage() {
	const { accounts } = await getAccountsAction()

	const revalidateCache = async () => {
		'use server'

		revalidatePath('/accounts', 'page')
	}

	return (
		<>
			<AccountsTable
				accounts={accounts.items}
				revalidateAccountsPath={revalidateCache}
			/>

			<AccountCreateDialog onRevalidateCache={revalidateCache} />

			<AccountUpdateDialog onRevalidateCache={revalidateCache} />
		</>
	)
}
