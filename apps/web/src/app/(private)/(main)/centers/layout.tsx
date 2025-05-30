import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Categorias',
}

export default function CategoriesLayout({
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
