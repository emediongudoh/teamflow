'use client'

import { KeyboardEventHandler, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

// Third party imports
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

// Custom import
import { FormErrors } from './form-errors'

interface FormTextareaProps {
    id: string
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    defaultValue?: string
    errors?: Record<string, string[] | undefined>
    className?: string
    onBlur?: () => void
    onClick?: () => void
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        {
            id,
            label,
            placeholder,
            required,
            disabled,
            defaultValue,
            errors,
            className,
            onBlur,
            onClick,
            onKeyDown,
        },
        ref
    ) => {
        const { pending } = useFormStatus()

        return (
            <div className='flex flex-col gap-1 text-sm'>
                {label ? <Label htmlFor={id}>{label}</Label> : null}

                <Textarea
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    disabled={pending || disabled}
                    defaultValue={defaultValue}
                    ref={ref}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    onClick={onClick}
                    className={cn(
                        'charlestonGreen resize-none rounded-md border-none px-3 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        className
                    )}
                    aria-describedby={`${id}-error`}
                />

                <FormErrors
                    id={id}
                    errors={errors}
                />
            </div>
        )
    }
)

FormTextarea.displayName = 'FormTextarea'
