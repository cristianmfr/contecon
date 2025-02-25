import * as React from 'react'

import { cn } from '@/lib/cn'
import { Label } from './label'

interface TextareaProps extends React.ComponentProps<'textarea'> {
    label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className='flex flex-col gap-2'>
                {label && <Label className='text-sm'>{label}</Label>}
                <textarea
                    className={cn(
                        'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
