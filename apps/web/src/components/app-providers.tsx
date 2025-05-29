'use client'

import { ApolloProvider } from '@apollo/client'
import { Suspense } from 'react'
import { Toaster } from '@contecon/ui/components/toaster'
import { apolloClient } from '../lib/apollo-client'
import { ThemeProvider } from './theme-provider'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster />
      </ApolloProvider>
    </Suspense>
  )
}
