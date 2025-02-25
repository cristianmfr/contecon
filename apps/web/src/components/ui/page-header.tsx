import React from 'react'
import { Button } from './button'

export type HeaderActions = {
    title?: string
    icon?: React.ReactNode
    type?: 'default' | 'icon'
    onClick: () => void
}

interface PageHeaderProps {
    title: string
    subtitle?: string
    actions?: HeaderActions[]
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
    return (
        <div className='page-header flex justify-between items-center'>
            <div className='page-header-titles'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                {subtitle && (
                    <p className='text-sm text-muted-foreground'>{subtitle}</p>
                )}
            </div>
            {actions && (
                <div className='flex items-center gap-2'>
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            type='button'
                            variant='secondary'
                            size={action.type === 'icon' ? 'icon' : 'default'}
                            onClick={action.onClick}
                        >
                            <div className='flex items-center gap-2'>
                                {action.icon}
                                {action.title}
                            </div>
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}
