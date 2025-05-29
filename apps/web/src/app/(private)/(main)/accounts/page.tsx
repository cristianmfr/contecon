import { PageContent, PageHeader, PageLayout, PageTitle } from '@/src/components/page-layout'

import { BreadcrumbItem } from '@/src/components/page-layout'
import { AccountsTable } from '@/src/components/tables/accounts/data-table'

const breadcrumbData: BreadcrumbItem[] = [
  {
    label: 'Dashboard',
    url: '/',
  },
  {
    label: 'Contas financeiras',
    url: '/accounts',
  },
]

export default function Accounts() {
  return (
    <PageLayout>
      <PageHeader breadcrumbs={breadcrumbData}>
        <PageTitle>Contas financeiras</PageTitle>
      </PageHeader>
      <PageContent>
        <AccountsTable />
      </PageContent>
    </PageLayout>
  )
}
