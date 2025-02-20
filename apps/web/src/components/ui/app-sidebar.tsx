'use client'

import * as React from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import {
    ArrowDownUp,
    BanknoteIcon,
    ChartBarBig,
    ChartPie,
    CircleDollarSign,
    FileCheck,
    HandCoinsIcon,
    Tags,
    Users2,
} from 'lucide-react'
import logoSymbol from '@/assets/brand/logo-symbol.svg'
import { NavUser } from './user-nav'
import { GET_CURRENT_USER } from '@/shared/api/queries/get-current-user'
import { useQuery } from '@apollo/client'
import { VersionSwitcher } from './version-switcher'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: me } = useQuery(GET_CURRENT_USER)

    const data = {
        versions: ['Menu principal', 'Administrativo'],
        navMain: [
            {
                title: 'main menu',
                url: '/',
                isActive: true,
                items: [
                    {
                        title: 'Dashboard',
                        url: '/app',
                        isActive: false,
                        icon: <ChartPie />,
                    },
                    {
                        title: 'Lançamentos',
                        url: 'entries',
                        isActive: false,
                        icon: <CircleDollarSign />,
                    },
                    {
                        title: 'Contas recorrentes',
                        url: 'recurring-accounts',
                        isActive: false,
                        icon: <ArrowDownUp />,
                    },
                    {
                        title: 'Notas fiscais',
                        url: 'fiscal-notes',
                        isActive: false,
                        icon: <FileCheck />,
                    },
                    {
                        title: 'Favorecidos',
                        url: 'beneficiaries',
                        isActive: false,
                        icon: <Users2 />,
                    },
                    {
                        title: 'Centro de custos',
                        url: 'cost-centers',
                        isActive: false,
                        icon: <HandCoinsIcon />,
                    },
                    {
                        title: 'Categorias',
                        url: 'categories',
                        isActive: false,
                        icon: <Tags />,
                    },
                    {
                        title: 'Contas financeiras',
                        url: 'financial-accounts',
                        isActive: false,
                        icon: <BanknoteIcon />,
                    },
                    {
                        title: 'Relatórios',
                        url: 'reports',
                        isActive: false,
                        icon: <ChartBarBig />,
                    },
                ],
            },
        ],
    }

    const user = {
        name: me?.getCurrentUser.name || '',
        email: me?.getCurrentUser.email || '',
    }

    return (
        <Sidebar {...props} variant='sidebar' collapsible='none'>
            <SidebarHeader>
                <VersionSwitcher
                    versions={data.versions}
                    defaultVersion={data.versions[0] || ''}
                />
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                            // onClick={() => {
                                            //     navigate(item.url)
                                            // }}
                                        >
                                            <div className='flex items-center gap-2'>
                                                {item.icon}
                                                <span className='text-sm font-medium'>
                                                    {item.title}
                                                </span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser name={user.name} email={user.email} photoURL={''} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
