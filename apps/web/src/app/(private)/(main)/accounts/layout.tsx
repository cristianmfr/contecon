import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Contas financeiras',
}

export default function AccountsLayout({
	children,
	modal,
}: {
	modal: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<>
			{modal}
			{children}
		</>
	)
}
