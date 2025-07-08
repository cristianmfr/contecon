'use client'

import { useBeneficiaryParams } from '@/src/hooks/use-beneficiary-params'
import { Button } from '@contecon/ui/components/button'

export function BeneficiariesEmptyState() {
	const { setParams } = useBeneficiaryParams()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>Nenhum favorecido encontrado</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhum favorecido. <br />
						Crie seu primeiro favorecido agora.
					</p>
				</div>

				<Button
					variant='outline'
					onClick={() => setParams({ createBeneficiary: true })}
				>
					Criar favorecido
				</Button>
			</div>
		</div>
	)
}
