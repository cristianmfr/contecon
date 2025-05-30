import { usePathname, useRouter } from 'next/navigation'

interface UseSearchParamsReturn {
	getParam: (key: string) => string | null
	getAllParams: () => Record<string, string>
	setParam: (
		key: string,
		value: string | number | boolean | null | undefined,
	) => void
	setParams: (
		params: Record<string, string | number | boolean | null | undefined>,
	) => void
	deleteParam: (key: string) => void
	clearParams: () => void
}

export function useSearchParams(): UseSearchParamsReturn {
	const router = useRouter()
	const pathname = usePathname()

	function getSearchParams(): URLSearchParams {
		if (typeof window === 'undefined') return new URLSearchParams()
		return new URLSearchParams(window.location.search)
	}

	function getParam(key: string): string | null {
		const searchParams = getSearchParams()
		return searchParams.get(key)
	}

	function getAllParams(): Record<string, string> {
		const searchParams = getSearchParams()
		const params: Record<string, string> = {}

		for (const [key, value] of searchParams.entries()) {
			params[key] = value
		}

		return params
	}

	function setParam(
		key: string,
		value: string | number | boolean | null | undefined,
	): void {
		const searchParams = getSearchParams()

		if (value === null || value === undefined || value === '') {
			searchParams.delete(key)
		} else {
			searchParams.set(key, String(value))
		}

		const search = searchParams.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`)
	}

	function setParams(
		params: Record<string, string | number | boolean | null | undefined>,
	): void {
		const searchParams = getSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value === null || value === undefined || value === '') {
				searchParams.delete(key)
			} else {
				searchParams.set(key, String(value))
			}
		})

		const search = searchParams.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`)
	}

	function deleteParam(key: string): void {
		const searchParams = getSearchParams()
		searchParams.delete(key)

		const search = searchParams.toString()
		const query = search ? `?${search}` : ''

		router.push(`${pathname}${query}`)
	}

	function clearParams(): void {
		router.push(pathname)
	}

	return {
		getParam,
		getAllParams,
		setParam,
		setParams,
		deleteParam,
		clearParams,
	}
}
