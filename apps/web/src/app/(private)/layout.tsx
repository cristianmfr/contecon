import { BreadcrumbComponent, PageProvider } from '@/components/templates/page'
import { AppSidebar } from '@/components/ui/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className='h-screen'>
            <AppSidebar />
            <SidebarInset>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    <PageProvider>
                        <BreadcrumbComponent />
                        {children}
                    </PageProvider>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
