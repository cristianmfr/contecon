'use client'

import { useCenterParams } from '@/src/hooks/use-centers-params'
import { Button } from '@contecon/ui/components/button'

export function CentersEmptyState() {
	const { setParams } = useCenterParams()

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
					onClick={() => setParams({ createCenter: true })}
				>
					Criar centro de custo
				</Button>
			</div>
		</div>
	)
}
