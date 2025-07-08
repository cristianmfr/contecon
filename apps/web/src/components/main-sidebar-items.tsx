'use client'

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@contecon/ui/components/sidebar'
import {
	CircleDollarSign,
	FileLineChartIcon,
	FileSpreadsheetIcon,
	HandCoinsIcon,
	LayoutDashboardIcon,
	LucideIcon,
	PiggyBankIcon,
	RepeatIcon,
	TagIcon,
	UsersIcon,
} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

type SidebarMenuItem = {
	url: string
	label: string
	icon?: LucideIcon
}

export function MainSidebarItems() {
	const pathname = usePathname()
	const { push } = useRouter()

	const mainItems: SidebarMenuItem[] = [
		{
			url: '/',
			label: 'Dashboard',
			icon: LayoutDashboardIcon,
		},
		{
			url: '/entries',
			label: 'Lançamentos',
			icon: CircleDollarSign,
		},
		{
			url: '/beneficiaries',
			label: 'Favorecidos',
			icon: UsersIcon,
		},
		{
			url: '/centers',
			label: 'Centro de Custos',
			icon: HandCoinsIcon,
		},
		{
			url: '/categories',
			label: 'Categorias',
			icon: TagIcon,
		},
		{
			url: '/accounts',
			label: 'Contas Financeiras',
			icon: PiggyBankIcon,
		},
		{
			url: '/recurring-billings',
			label: 'Contas Recorrentes',
			icon: RepeatIcon,
		},
		{
			url: '/invoices',
			label: 'Notas Fiscais',
			icon: FileSpreadsheetIcon,
		},
		{
			url: '/reports',
			label: 'Relatórios',
			icon: FileLineChartIcon,
		},
	]

	return (
		<SidebarMenu>
			<SidebarMenuItem className='px-2 py-1'>
				<span className='text-xs font-medium text-muted-foreground'>
					Plataforma
				</span>
			</SidebarMenuItem>
			{mainItems.map((item, index) => (
				<SidebarMenuItem key={index}>
					<SidebarMenuButton
						isActive={item.url === pathname}
						className='transition ease-in cursor-pointer px-3'
						onClick={() => push(item.url)}
					>
						{item.icon && <item.icon />}
						{item.label}
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	)
}
