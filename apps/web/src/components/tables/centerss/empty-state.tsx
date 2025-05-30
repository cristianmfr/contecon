'use client'

import { Button } from '@contecon/ui/components/button'
import { useRouter } from 'next/navigation'

export function CentersEmptyState() {
	const router = useRouter()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>
						Nenhum centro de custo encontrado
					</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhum centro de custo. <br />
						Crie seu primeiro centro de custo agora.
					</p>
				</div>

				<Button
					variant='outline'
					onClick={() => router.push('/centers/create')}
				>
					Criar centro de custo
				</Button>
			</div>
		</div>
	)
}
