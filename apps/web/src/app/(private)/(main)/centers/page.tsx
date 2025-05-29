import { PageContent, PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'

import { BreadcrumbItem } from '@/src/components/page-layout'
import { CentersTable } from '@/src/components/tables/centers/data-table'

const breadcrumbData: BreadcrumbItem[] = [
  {
    label: 'Dashboard',
    url: '/',
  },
  {
    label: 'Centros de custo',
    url: '/centers',
  },
]

export default function Centers() {
  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>Centros de custo</PageTitle>
      </PageHeader>
      <PageContent>
        <CentersTable />
      </PageContent>
    </PageLayout>
  )
}
