import { PageContent, PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'

import { BreadcrumbItem } from '@/src/components/page-layout'
import { EntriesTable } from '@/src/components/tables/entries/data-table'

const breadcrumbData: BreadcrumbItem[] = [
  {
    label: 'Dashboard',
    url: '/',
  },
  {
    label: 'Lançamentos',
    url: '/entries',
  },
]

export default function Entries() {
  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>Lançamentos</PageTitle>
      </PageHeader>
      <PageContent>
        <EntriesTable />
      </PageContent>
    </PageLayout>
  )
}
