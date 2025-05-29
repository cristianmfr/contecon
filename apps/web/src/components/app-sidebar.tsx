'use client'

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu } from '@contecon/ui/components/sidebar'
import { usePathname } from 'next/navigation'
import { CalendarMenuItems } from './calendar-menu-items'
import { MainSidebarItems } from './main-sidebar-items'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar {...props} collapsible='offcanvas'>
      <SidebarHeader>
        <span>Contecon</span>
      </SidebarHeader>
      <SidebarContent className='px-2'>
        <SidebarMenu>{pathname.includes('calendar') ? <CalendarMenuItems /> : <MainSidebarItems />}</SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
