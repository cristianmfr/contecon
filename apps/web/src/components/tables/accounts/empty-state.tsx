'use client'

import { useAccountParams } from '@/src/hooks/use-account-params'
import { Button } from '@contecon/ui/components/button'

export function AccountsEmptyState() {
	const { setParams } = useAccountParams()

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
					onClick={() => setParams({ createAccount: true })}
				>
					Criar conta
				</Button>
			</div>
		</div>
	)
}
