'use client'

import { useFormStatus } from 'react-dom'

// Third party imports
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormButtonProps {
    children: React.ReactNode
    disabled?: boolean
    className?: string
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
        | 'primary'
        | 'chineseBlack'
        | 'raisinBlack'
        | 'charlestonGreen'
        | 'transparent'
}

export const FormButton = ({
    children,
    disabled,
    className,
    variant = 'primary',
}: FormButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <Button
            type='submit'
            variant={variant}
            size='sm'
            disabled={pending || disabled}
            className={cn(className)}
        >
            {children}
        </Button>
    )
}
