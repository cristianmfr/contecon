import React from 'react'
import { usePage } from '@/components/templates/page'
import { Button } from '@/components/ui/button'

export const PageHeader: React.FC = () => {
    const { title, subtitle, actions } = usePage()

    return (
        <div className='page-header flex justify-between items-center'>
            <div className='page-header-titles'>
                <h1 className='text-2xl font-semibold'>{title}</h1>
                {subtitle && (
                    <p className='text-sm text-muted-foreground'>{subtitle}</p>
                )}
            </div>
            {actions && (
                <Button variant='secondary' onClick={actions.onClick}>
                    {actions.icon}
                    {actions.title}
                </Button>
            )}
        </div>
    )
}
