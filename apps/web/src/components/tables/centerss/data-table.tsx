'use client'

import { useCenterParams } from '@/src/hooks/use-centers-params'
import { Center } from '@contecon/graphql/lib/graphql'
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

import { SearchInput } from '../../search-input'
import { columns } from './columns'
import { CentersEmptyState } from './empty-state'
import { CentersRow } from './rows'

export const CentersTable = ({ centers }: { centers: Center[] }) => {
	const { setParams } = useCenterParams()

	const table = useReactTable({
		data: centers,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (centers.length === 0) {
		return <CentersEmptyState />
	}

	return (
		<Card>
			<CardHeader className='grid grid-cols-2 w-full'>
				<SearchInput />
				<div className='flex items-center justify-end gap-2'>
					<Button variant='outline' size='icon'>
						<Settings2 className='size-4' />
					</Button>
					<Button
						size='icon'
						onClick={() => setParams({ createCenter: true })}
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
									const isLast =
										index === headerGroup.headers.length - 1

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
							<CentersRow key={row.id} row={row} />
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
