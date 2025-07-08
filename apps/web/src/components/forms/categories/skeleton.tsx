'use client'

import { Skeleton } from '@contecon/ui/components/skeleton'

export const CategoryFormSkeleton = () => {
	return (
		<div className='grid w-full gap-2'>
			<div className='grid grid-cols-5 gap-2'>
				<div className='col-span-3'>
					<Skeleton className='h-10 w-full' />
				</div>
				<div className='col-span-2'>
					<Skeleton className='h-10 w-full' />
				</div>
			</div>
			<Skeleton className='h-24 w-full' />
			<div className='grid grid-cols-2 gap-2'>
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-10 w-full' />
			</div>
		</div>
	)
}
