'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React, { createContext, useContext, ReactNode } from 'react'

interface Breadcrumb {
    label: string
    path?: string
}

interface PageContextProps {
    breadcrumbs: Breadcrumb[]
    setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
    title: string
    setTitle: (title: string) => void
    subtitle?: string
    setSubtitle: (subtitle?: string) => void
    actions?: {
        title: string
        icon: React.ReactNode
        onClick: () => void
    }
    setActions: (actions?: {
        title: string
        icon: React.ReactNode
        onClick: () => void
    }) => void
}

interface PageProviderProps {
    children: ReactNode
}

const PageContext = createContext<PageContextProps | undefined>(undefined)

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
    const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumb[]>([])
    const [title, setTitle] = React.useState<string>('')
    const [subtitle, setSubtitle] = React.useState<string>()
    const [actions, setActions] = React.useState<PageContextProps['actions']>()

    return (
        <PageContext.Provider
            value={{
                breadcrumbs,
                setBreadcrumbs,
                title,
                setTitle,
                subtitle,
                setSubtitle,
                actions,
                setActions,
            }}
        >
            {children}
        </PageContext.Provider>
    )
}

export const usePage = () => {
    const context = useContext(PageContext)
    if (!context) {
        throw new Error('usePage must be used within a PageProvider')
    }
    return context
}

export const BreadcrumbComponent: React.FC = () => {
    const { breadcrumbs } = usePage()

    return (
        <Breadcrumb className='mb-2'>
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={breadcrumb.path}>
                                {breadcrumb.label}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < breadcrumbs.length - 1 && (
                            <BreadcrumbSeparator />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
