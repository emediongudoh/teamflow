'use client'

import { ElementRef, useRef } from 'react'
import { useRouter } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose,
} from '@/components/ui/popover'
import { X } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'
import { useProModal } from '@/hooks/use-pro-modal'
import { FormInput } from './form-input'
import { FormButton } from './form-button'
import { FormPicker } from './form-picker'

interface FormPopoverProps {
    children: React.ReactNode
    side?: 'left' | 'right' | 'top' | 'bottom'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number
}

export const FormPopover = ({
    children,
    side = 'bottom',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const router = useRouter()
    const proModal = useProModal()

    const closeRef = useRef<ElementRef<'button'>>(null)

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: data => {
            toast.success('Board created')
            closeRef.current?.click()
            router.push(`/board/${data.id}`)
        },
        onError: error => {
            toast.error(error)
            proModal.onOpen()
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const image = formData.get('image') as string

        execute({ title, image })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                align={align}
                side={side}
                sideOffset={sideOffset}
                className='raisinBlack flex max-w-sm flex-col gap-4 border-none p-4 shadow'
            >
                <div className='flex items-center justify-between'>
                    <h2>Create board</h2>
                    <PopoverClose
                        asChild
                        ref={closeRef}
                    >
                        <Button
                            variant='charlestonGreen'
                            size='sm'
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </PopoverClose>
                </div>

                <form
                    action={onSubmit}
                    className='flex flex-col gap-4'
                >
                    <FormPicker
                        id='image'
                        errors={fieldErrors}
                    />
                    <FormInput
                        label='Board title'
                        type='text'
                        id='title'
                        errors={fieldErrors}
                    />
                    <FormButton>Create</FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}
