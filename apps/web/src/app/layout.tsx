import type { Metadata } from 'next'
import { Space_Mono, Titillium_Web } from 'next/font/google'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/shared/providers/theme'
import { Suspense } from 'react'
import { ApolloProvider } from '@/shared/providers/apollo'

import '@contecon/tailwind/styles'

const titillium = Titillium_Web({
    variable: '--font-titillium',
    subsets: ['latin'],
    weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
    title: 'Bem-vindo | Contecon',
    description: 'Sistema de contabilidade online',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='pt-BR' suppressHydrationWarning>
            <body className={`${titillium.className} antialiased`}>
                <Suspense>
                    <ApolloProvider>
                        <ThemeProvider
                            attribute='class'
                            defaultTheme='dark'
                            enableSystem
                            disableTransitionOnChange
                        >
                            {children}
                        </ThemeProvider>
                        <Toaster richColors />
                    </ApolloProvider>
                </Suspense>
            </body>
        </html>
    )
}
