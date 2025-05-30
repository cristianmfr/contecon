import {
	PageContent,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { BreadcrumbItem } from '@/src/components/page-layout'
import { CategoriesTable } from '@/src/components/tables/categories/data-table'

const breadcrumbData: BreadcrumbItem[] = [
	{
		label: 'Dashboard',
		url: '/',
	},
	{
		label: 'Categorias',
		url: '/categories',
	},
]

export default function Categories() {
	return (
		<PageLayout>
			<PageHeader breadcrumbs={breadcrumbData}>
				<PageTitle>Categorias</PageTitle>
			</PageHeader>
			<PageContent>
				<CategoriesTable />
			</PageContent>
		</PageLayout>
	)
}
