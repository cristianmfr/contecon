'use client'

import { DeleteItemModal } from '@/src/components/modals/delete-item-modal'
import { SearchInput } from '@/src/components/search-input'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { ACCOUNTS } from '@/src/server/accounts/accounts.query'
import { DELETE_ACCOUNT } from '@/src/server/accounts/delete-account.mutation'
import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardFooter } from '@contecon/ui/components/card'
import { CardHeader } from '@contecon/ui/components/card'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@contecon/ui/components/table'
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PaginatedControls } from '../../paginated-controls'
import { AccountColumns } from './columns'
import { AccountsEmpty } from './empty'
import { AccountsRow } from './row'
import { AccountsSkeleton } from './skeleton'

export const AccountsTable = () => {
	const router = useRouter()

	const shouldRefetch = useRefetchStore((s) => s.shouldRefetch)
	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const {
		data,
		loading,
		refetch: refetchAccounts,
	} = useQuery(ACCOUNTS, {
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	})

	const [deleteAccount] = useMutation(DELETE_ACCOUNT)

	const searchParams = useSearchParams()
	const itemId = searchParams.get('deleteId')

	const handleDeleteAccount = () => {
		deleteAccount({
			variables: {
				deleteAccountId: itemId,
			},
		})
			.then(() => {
				refetchAccounts()
				router.push('/accounts')
				toast.success('Conta deletada com sucesso')
			})
			.catch((error) => {
				console.error(error.message)
				toast.error('Erro ao deletar conta')
			})
	}

	const table = useReactTable({
		data: data?.accounts.items || [],
		columns: AccountColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	useEffect(() => {
		if (shouldRefetch) {
			refetchAccounts()
			setShouldRefetch(false)
		}
	}, [shouldRefetch])

	if (loading) return <AccountsSkeleton />

	return (
		<Card>
			{!(data?.accounts.items.length === 0 || !data?.accounts.items) && (
				<CardHeader className='grid grid-cols-2'>
					<SearchInput />
					<div className='flex items-center justify-end'>
						<Button onClick={() => router.push('/accounts/create')}>
							<Plus />
							criar conta
						</Button>
					</div>
				</CardHeader>
			)}
			<CardContent>
				{data?.accounts.items.length === 0 || !data?.accounts.items ? (
					<AccountsEmpty />
				) : (
					<Table className='border-separate border-spacing-y-[5px]'>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									className='hover:bg-transparent border-none'
								>
									{headerGroup.headers.map((header, index) => {
										const isFirst = index === 0
										const isLast = index === headerGroup.headers.length - 1

										return (
											<TableHead
												key={header.id}
												className={`${isFirst ? 'pl-6' : ''} ${isLast ? 'text-right' : ''}`}
											>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.map((row) => (
								<AccountsRow key={row.id} row={row} />
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<CardFooter>
				<PaginatedControls
					total={data?.accounts.total || 0}
					currentPage={table.getState().pagination.pageIndex}
					pageSize={table.getState().pagination.pageSize}
					onPageChange={table.setPageIndex}
					onPageSizeChange={table.setPageSize}
				/>
			</CardFooter>
			<DeleteItemModal path='/accounts' onDelete={handleDeleteAccount} />
		</Card>
	)
}
