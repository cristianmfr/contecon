import {
	BreadcrumbItem,
	Content,
	Header,
	Layout,
} from '@/src/components/page-template'
import { Title } from '@/src/components/page-template'

export default function EntriesTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', url: '/dashboard' },
		{ label: 'Lançamentos', url: '/entries' },
	]

	return (
		<Layout>
			<Header breadcrumbs={breadcrumbs}>
				<Title>Lançamentos</Title>
			</Header>
			<Content>{children}</Content>
		</Layout>
	)
}
