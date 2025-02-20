'use client'

import { ApolloProvider as ServerProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apollo'

export function ApolloProvider({ children }: { children: React.ReactNode }) {
    return <ServerProvider client={apolloClient}>{children}</ServerProvider>
}
