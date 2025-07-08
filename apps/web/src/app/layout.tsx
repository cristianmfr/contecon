import '@contecon/ui/globals.css'
import { Metadata } from 'next'
import { Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { AppProvider } from '../components/app-providers'

const fontSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-sans',
})

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})

export const metadata: Metadata = {
	title: {
		default: 'Contecon',
		template: `%s | Contecon`,
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<NuqsAdapter>
					<AppProvider>{children}</AppProvider>
				</NuqsAdapter>
			</body>
		</html>
	)
}
