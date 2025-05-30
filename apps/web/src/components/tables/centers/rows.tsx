'use client'

import { Center } from '@contecon/graphql/lib/graphql'
import { TableCell, TableRow } from '@contecon/ui/components/table'
import { cn } from '@contecon/ui/lib/utils'
import { type Row, flexRender } from '@tanstack/react-table'

type Props = {
	row: Row<Center>
}

export function CentersRow({ row }: Props) {
	return (
		<>
			<TableRow
				className='bg-accent/10 hover:bg-accent/20 cursor-default h-[45px] border-none'
				key={row.id}
			>
				{row.getVisibleCells().map((cell, index) => (
					<TableCell
						key={cell.id}
						className={cn(
							index === 0 && 'rounded-l-md pl-5 w-44',
							index === 1 && 'w-58',
							index === 2 && 'w-26',
							index === row.getVisibleCells().length - 1 &&
								'rounded-r-md pr-4 w-12',
							'hidden md:table-cell',
						)}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				))}
			</TableRow>
		</>
	)
}
