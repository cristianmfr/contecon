'use client'

import mainLogo from '@/src/assets/brand/main-logo.png'
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
} from '@contecon/ui/components/sidebar'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { CalendarMenuItems } from './calendar-menu-items'
import { MainSidebarItems } from './main-sidebar-items'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname()

	return (
		<Sidebar {...props} collapsible='offcanvas'>
			<SidebarHeader>
				<SidebarMenuButton
					asChild
					className='data-[slot=sidebar-menu-button]:!p-1.5 h-12 -mb-2'
				>
					<a href='#' className='flex items-center gap-2'>
						<Image src={mainLogo} alt='Company Logo' width={32} height={32} />
						<span className='text-base font-semibold'>contecon</span>
					</a>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent className='px-2'>
				<SidebarMenu>
					{pathname.includes('calendar') ? (
						<CalendarMenuItems />
					) : (
						<MainSidebarItems />
					)}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	)
}
