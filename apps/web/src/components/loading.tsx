import { Loader2 } from 'lucide-react'

export default function Loading() {
	return (
		<div className='flex h-screen w-full items-center justify-center'>
			<Loader2 className='h-4 w-4 animate-spin' />
		</div>
	)
}
