import { ACCOUNT, ACCOUNTS } from '@/src/graphql/queries'
import { query } from '@/src/lib/apollo-ssr-client'
import { revalidatePath } from 'next/cache'

export const getAccountsAction = async () => {
	const { data: accounts } = await query({
		query: ACCOUNTS,
		variables: { query: { skip: 0, take: 10 } },
	})

	return accounts
}

export const getAccountAction = async (accountId: string) => {
	const { data: account } = await query({
		query: ACCOUNT,
		variables: {
			accountId,
		},
	})

	return account
}

export async function revalidateAccountsPath() {
	'use server'

	revalidatePath('/accounts', 'page')
}
