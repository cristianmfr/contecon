import { DashboardCard } from '@contecon/ui/components/dashboard-card'

export function DashboardsCards() {
	return (
		<div className='grid grid-cols-4 gap-4'>
			<DashboardCard
				title='Total de vendas'
				trending='+10%'
				value='R$ 100.000,00'
				description='Total de vendas do mês'
				loading={false}
			/>
			<DashboardCard
				title='Total de clientes'
				trending='+10%'
				value='100'
				description='Total de clientes do mês'
				loading={false}
			/>
			<DashboardCard
				title='Total de recebimentos'
				trending='+10%'
				value='R$ 100.000,00'
				description='Total de recebimentos do mês'
				loading={false}
			/>
			<DashboardCard
				title='Total de pagamentos'
				trending='+10%'
				value='R$ 100.000,00'
				description='Total de pagamentos do mês'
				loading={false}
			/>
		</div>
	)
}
