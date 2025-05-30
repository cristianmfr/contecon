import {
	BreadcrumbItem,
	Content,
	Header,
	Layout,
} from '@/src/components/page-template'
import { Title } from '@/src/components/page-template'

export default function CategoriesTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', url: '/dashboard' },
		{ label: 'Categorias', url: '/categories' },
	]

	return (
		<Layout>
			<Header breadcrumbs={breadcrumbs}>
				<Title>Categorias</Title>
			</Header>
			<Content>{children}</Content>
		</Layout>
	)
}
