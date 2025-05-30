'use client'

import { useCategoryParams } from '@/src/hooks/use-category-params'
import { Button } from '@contecon/ui/components/button'

export function CategoriesEmptyState() {
	const { setParams } = useCategoryParams()

	return (
		<div className='flex items-center justify-center w-full h-56'>
			<div className='flex flex-col items-center'>
				<div className='text-center mb-6 space-y-2'>
					<h2 className='font-medium text-lg'>Nenhuma categoria encontrada</h2>
					<p className='text-[#606060] text-sm'>
						Você ainda não criou nenhuma categoria. <br />
						Crie sua primeira categoria agora.
					</p>
				</div>

				<Button
					variant='outline'
					onClick={() => setParams({ createCategory: true })}
				>
					Criar categoria
				</Button>
			</div>
		</div>
	)
}
