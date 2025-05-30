import {
	BreadcrumbItem,
	Content,
	Header,
	Layout,
} from '@/src/components/page-template'
import { Title } from '@/src/components/page-template'

export default function BeneficiariesTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	const breadcrumbs: BreadcrumbItem[] = [
		{ label: 'Dashboard', url: '/dashboard' },
		{ label: 'Favorecidos', url: '/beneficiaries' },
	]

	return (
		<Layout>
			<Header breadcrumbs={breadcrumbs}>
				<Title>Favorecidos</Title>
			</Header>
			<Content>{children}</Content>
		</Layout>
	)
}
