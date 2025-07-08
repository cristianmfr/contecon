import {
	BreadcrumbItem,
	Content,
	Header,
	Layout,
} from '@/src/components/page-template'
import { Title } from '@/src/components/page-template'

export default function AccountsTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', url: '/dashboard' },
		{ label: 'Contas financeiras', url: '/accounts' },
	]

	return (
		<Layout>
			<Header breadcrumbs={breadcrumbs}>
				<Title>Contas financeiras</Title>
			</Header>
			<Content>{children}</Content>
		</Layout>
	)
}
