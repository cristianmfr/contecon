import { Skeleton } from '@contecon/ui/components/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@contecon/ui/components/table'
import { TableHeader } from '@contecon/ui/components/table'

export function BeneficiariesSkeleton() {
	return (
		<Table>
			<TableHeader />
			<TableBody>
				{Array.from({ length: 25 }).map((_, index) => (
					<TableRow key={index.toString()} className='h-[45px]'>
						<TableCell>
							<Skeleton className='h-4 w-26' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-26' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-26' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-26' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-26' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
