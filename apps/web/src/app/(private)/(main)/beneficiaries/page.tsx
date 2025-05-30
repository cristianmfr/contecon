import {
	PageContent,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { BreadcrumbItem } from '@/src/components/page-layout'
import { BeneficiariesTable } from '@/src/components/tables/beneficiaries/data-table'

const breadcrumbData: BreadcrumbItem[] = [
	{
		label: 'Dashboard',
		url: '/',
	},
	{
		label: 'Favorecidos',
		url: '/beneficiaries',
	},
]

export default function Beneficiaries() {
	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>Favorecidos</PageTitle>
			</PageHeader>
			<PageContent>
				<BeneficiariesTable />
			</PageContent>
		</PageLayout>
	)
}
