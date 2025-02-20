'use client'

import * as React from 'react'
import {
    BadgeDollarSign,
    Check,
    ChevronsUpDown,
    Code2,
    Code2Icon,
    GalleryVerticalEnd,
} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

export function VersionSwitcher({
    versions,
    defaultVersion,
}: {
    versions: string[]
    defaultVersion: string
}) {
    const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='bg-sidebar-accent/50 border border-primary/10 data-[state=open]:border-primary/50 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <div className='flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-sidebar-primary-foreground'>
                                <Code2
                                    strokeWidth={2}
                                    className='size-5 bold text-background'
                                />
                            </div>
                            <div className='flex flex-col gap-1 leading-none'>
                                <span className='text-md font-semibold'>
                                    Contecon
                                </span>
                                <span className='font-normal text-[9px] font-mono uppercase'>
                                    {selectedVersion}
                                </span>
                            </div>
                            <ChevronsUpDown className='ml-auto' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width]'
                        align='start'
                    >
                        {versions.map((version) => (
                            <DropdownMenuItem
                                key={version}
                                onSelect={() => setSelectedVersion(version)}
                            >
                                {version}{' '}
                                {version === selectedVersion && (
                                    <Check className='ml-auto' />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
