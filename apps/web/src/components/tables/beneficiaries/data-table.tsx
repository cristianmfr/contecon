'use client'

import { AlertDeleteDialog } from '@/src/components/dialogs/alert-delete.dialog'
import { DELETE_BENEFICIARY } from '@/src/graphql/mutations'
import { BENEFICIARIES } from '@/src/graphql/queries'
import { useBeneficiaryParams } from '@/src/hooks/use-beneficiary-params'
import { useMutation } from '@apollo/client'
import { Beneficiary } from '@contecon/graphql/lib/graphql'
import { Button } from '@contecon/ui/components/button'
import { Card, CardContent, CardHeader } from '@contecon/ui/components/card'
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
import { Plus, Settings2 } from 'lucide-react'
import { toast } from 'sonner'

import { SearchInput } from '../../search-input'
import { columns } from './columns'
import { BeneficiariesEmptyState } from './empty-state'
import { BeneficiariesRow } from './rows'

export const BeneficiariesTable = ({
	beneficiaries,
	revalidateBeneficiariesPath,
}: {
	beneficiaries: Beneficiary[]
	revalidateBeneficiariesPath: () => Promise<void>
}) => {
	const { setParams, deleteBeneficiaryId } = useBeneficiaryParams()

	const [deleteBeneficiary] = useMutation(DELETE_BENEFICIARY, {
		variables: { deleteBeneficiaryId },
		refetchQueries: [
			{ query: BENEFICIARIES, variables: { query: { skip: 0, take: 10 } } },
		],
		onCompleted: () => {
			toast.success('Favorecido deletado com sucesso!')
			revalidateBeneficiariesPath()
		},
		onError: (error) => {
			toast.error('Erro ao deletar favorecido!')
			console.error(error)
		},
	})

	const table = useReactTable({
		data: beneficiaries,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (beneficiaries.length === 0) {
		return (
			<Card>
				<CardHeader>
					<BeneficiariesEmptyState />
				</CardHeader>
			</Card>
		)
	}

	return (
		<>
			<Card>
				<CardHeader className='grid grid-cols-2 w-full'>
					<SearchInput />
					<div className='flex items-center justify-end gap-2'>
						<Button variant='outline' size='icon'>
							<Settings2 className='size-4' />
						</Button>
						<Button
							size='icon'
							onClick={() => setParams({ createBeneficiary: true })}
						>
							<Plus className='size-4' />
						</Button>
					</div>
				</CardHeader>
				<CardContent>
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
								<BeneficiariesRow key={row.id} row={row} />
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<AlertDeleteDialog onDelete={() => deleteBeneficiary()} />
		</>
	)
}
