import { DashboardsCards } from '@/src/components/dashboards-cards'
import {
	PageContent,
	PageHeader,
	PageLayout,
	PageTitle,
} from '@/src/components/page-layout'
import { InlineChart } from '@contecon/ui/components/inline-chart'
import { Label } from '@contecon/ui/components/label'

export default function Dashboard() {
	return (
		<PageLayout>
			<PageHeader>
				<div className='flex flex-col gap-1'>
					<PageTitle>Dashboard</PageTitle>
					<Label className='text-muted-foreground'>
						Bem vindo ao seu dashboard. Aqui você pode ver todas as informações
						sobre o seu negócio.
					</Label>
				</div>
			</PageHeader>
			<PageContent>
				<DashboardsCards />
				<InlineChart />
			</PageContent>
		</PageLayout>
	)
}
