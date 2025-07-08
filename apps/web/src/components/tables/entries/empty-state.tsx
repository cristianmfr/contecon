'use client'

import { useEntryParams } from '@/src/hooks/use-entry-params'
import { Button } from '@contecon/ui/components/button'

export function EntriesEmptyState() {
	const { setParams } = useEntryParams()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>Nenhum lançamento encontrado</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhum lançamento. <br />
						Crie seu primeiro lançamento agora.
					</p>
				</div>
				<Button
					variant='outline'
					onClick={() => setParams({ createEntry: true })}
				>
					Criar lançamento
				</Button>
			</div>
		</div>
	)
}
