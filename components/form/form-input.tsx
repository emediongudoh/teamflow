'use client'

import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

// Third party imports
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// Custom import
import { FormErrors } from './form-errors'

interface FormInputProps {
    label?: string
    id: string
    type?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    defaultValue?: string
    className?: string
    errors?: Record<string, string[] | undefined>
    onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            label,
            id,
            type,
            placeholder,
            required,
            disabled,
            defaultValue = '',
            className,
            errors,
            onBlur,
        },
        ref
    ) => {
        const { pending } = useFormStatus()

        return (
            <div className='flex flex-col gap-1 text-sm'>
                {label ? <Label htmlFor={id}>{label}</Label> : null}

                <Input
                    type={type}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    required={required}
                    disabled={pending || disabled}
                    defaultValue={defaultValue}
                    ref={ref}
                    onBlur={onBlur}
                    className={cn(
                        'charlestonGreen rounded-md border-none px-3 py-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
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

FormInput.displayName = 'FormInput'
