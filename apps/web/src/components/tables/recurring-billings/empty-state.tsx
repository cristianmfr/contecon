'use client'

import { useRecurringBillingParams } from '@/src/hooks/use-recurring-billing-params'
import { Button } from '@contecon/ui/components/button'

export function RecurringBillingEmptyState() {
	const { setParams } = useRecurringBillingParams()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>Nenhum lançamento encontrado</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhuma conta recorrente. <br />
						Crie sua primeira conta recorrente agora.
					</p>
				</div>
				<Button
					variant='outline'
					onClick={() => setParams({ createRecurringBilling: true })}
				>
					Criar conta recorrente
				</Button>
			</div>
		</div>
	)
}
