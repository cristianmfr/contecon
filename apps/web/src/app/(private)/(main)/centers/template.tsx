import {
	BreadcrumbItem,
	Content,
	Header,
	Layout,
} from '@/src/components/page-template'
import { Title } from '@/src/components/page-template'

export default function CentersTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', url: '/dashboard' },
		{ label: 'Centros de custo', url: '/centers' },
	]

	return (
		<Layout>
			<Header breadcrumbs={breadcrumbs}>
				<Title>Centros de custo</Title>
			</Header>
			<Content>{children}</Content>
		</Layout>
	)
}
