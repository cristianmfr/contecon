import { Skeleton } from '@contecon/ui/components/skeleton'

export const BeneficiaryFormSkeleton = () => {
	return (
		<div className='grid gap-2 w-full'>
			<div className='grid grid-cols-3 gap-2'>
				<div className='col-span-2'>
					<Skeleton className='h-10 w-full' />
				</div>
				<Skeleton className='h-10 w-full' />
			</div>
			<Skeleton className='h-10 w-full' />
			<div className='grid grid-cols-2 gap-2'>
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-10 w-full' />
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-10 w-full' />
			</div>
			<div className='grid grid-cols-2 gap-2'>
				<Skeleton className='h-10 w-full' />
				<Skeleton className='h-10 w-full' />
			</div>
		</div>
	)
}
