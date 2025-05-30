import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Redefinir senha',
}

export default function ResetPasswordLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
