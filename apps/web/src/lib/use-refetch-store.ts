'use client'

import { create } from 'zustand'

interface RefetchState {
	shouldRefetch: boolean
	setShouldRefetch: (val: boolean) => void
}

export const useRefetchStore = create<RefetchState>((set) => ({
	shouldRefetch: false,
	setShouldRefetch: (val: boolean) => set({ shouldRefetch: val }),
}))
