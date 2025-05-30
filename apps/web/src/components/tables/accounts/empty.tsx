'use client'

import { Button } from '@contecon/ui/components/button'
import { useRouter } from 'next/navigation'

export function AccountsEmpty() {
	const router = useRouter()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>Nenhuma conta encontrada</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhuma conta. <br />
						Crie sua primeira conta agora.
					</p>
				</div>

				<Button
					variant='outline'
					onClick={() => router.push('/accounts/create')}
				>
					Criar conta
				</Button>
			</div>
		</div>
	)
}
