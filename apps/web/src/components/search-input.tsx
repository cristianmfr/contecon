'use client'

import { useSearchParams } from '@/src/hooks/use-search-params'
import { useRefetchStore } from '@/src/lib/use-refetch-store'
import { Button } from '@contecon/ui/components/button'
import { Input } from '@contecon/ui/components/input'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export const SearchInput = () => {
	const { getParam, setParam } = useSearchParams()

	const [searchInput, setSearchInput] = useState<string>('')
	const searchFromUrlParam = getParam('search')

	const setShouldRefetch = useRefetchStore((s) => s.setShouldRefetch)

	const applySearch = () => {
		if (searchInput) {
			setParam('search', searchInput)
		} else {
			setParam('search', null)
		}

		setTimeout(() => {
			setShouldRefetch(true)
		}, 100)
	}

	const clearSearch = () => {
		setSearchInput('')
		setParam('search', null)

		setTimeout(() => {
			setShouldRefetch(true)
		}, 100)
	}

	return (
		<div className='flex items-center gap-2'>
			<Input
				id='search'
				value={searchInput}
				onChange={(event) => setSearchInput(event.target.value)}
				placeholder='Pesquisar...'
			/>
			{searchFromUrlParam ? (
				<Button onClick={clearSearch} size='icon' variant='secondary'>
					<X />
				</Button>
			) : (
				<Button onClick={applySearch} size='icon' variant='secondary'>
					<Search />
				</Button>
			)}
		</div>
	)
}
