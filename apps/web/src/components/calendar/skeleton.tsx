import { Card, CardContent } from '@contecon/ui/components/card'
import { Skeleton } from '@contecon/ui/components/skeleton'

export default function CalendarSkeleton() {
	return (
		<div className='flex flex-col w-full h-full gap-4 p-8'>
			<Skeleton className='w-full h-10' />
			<Card className='w-full h-full'>
				<CardContent className='w-full h-full'>
					<div className='flex flex-col w-full h-full gap-4'>
						<div className='grid grid-cols-2 px-8'>
							<div className='flex items-center gap-4'>
								<Skeleton className='w-24 h-10' />
								<Skeleton className='w-24 h-10' />
								<Skeleton className='w-24 h-10' />
								<Skeleton className='w-24 h-10' />
							</div>
							<div className='flex items-center justify-end gap-4'>
								<Skeleton className='w-24 h-10' />
								<Skeleton className='w-24 h-10' />
								<Skeleton className='w-24 h-10' />
							</div>
						</div>
						<div className='grid grid-cols-7 w-full h-full p-8 gap-4'>
							{Array.from({ length: 35 }).map((_, index) => (
								<Skeleton key={index} className='col-span-1 row-span-1' />
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
