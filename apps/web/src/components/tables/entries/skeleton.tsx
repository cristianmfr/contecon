import { Skeleton } from '@contecon/ui/components/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@contecon/ui/components/table'
import { TableHeader } from '@contecon/ui/components/table'

export function EntriesSkeleton() {
	return (
		<Table>
			<TableHeader />
			<TableBody>
				{Array.from({ length: 25 }).map((_, index) => (
					<TableRow key={index.toString()} className='h-[45px]'>
						<TableCell>
							<Skeleton className='h-4 w-24' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-36' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-28' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-24' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-16' />
						</TableCell>
						<TableCell>
							<Skeleton className='h-4 w-12' />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
