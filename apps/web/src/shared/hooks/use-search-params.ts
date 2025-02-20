'use client'

import { useSearchParams as useNextSearchParams } from 'next/navigation'

export function useSearchParams() {
    const searchParams = useNextSearchParams()

    const set = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    const remove = (key: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete(key)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    const get = (key: string) => {
        return searchParams.get(key)
    }

    return {
        searchParams,
        set,
        remove,
        get,
    }
}
