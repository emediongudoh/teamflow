'use client'

import { ElementRef, useRef, useState } from 'react'
import { useParams } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { AlignLeft } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { CardWithList } from '@/types'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormButton } from '@/components/form/form-button'
import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks/use-action'

interface CardModalDescriptionProps {
    data: CardWithList
}

export const CardModalDescription = ({ data }: CardModalDescriptionProps) => {
    const params = useParams()
    const queryClient = useQueryClient()

    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<'form'>>(null)
    const textareaRef = useRef<ElementRef<'textarea'>>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    useEventListener('keydown', onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id],
            })

            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id],
            })

            toast.success(`Card "${data.title}" updated`)
            disableEditing()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string
        const boardId = params.boardId as string

        execute({ id: data.id, description, boardId })
    }

    return (
        <div className='flex gap-3'>
            <AlignLeft className='h-6 w-6' />

            <div className='flex flex-col gap-3'>
                <h2 className='text-slate-300'>Description</h2>

                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className='flex w-52 flex-col gap-1 sm:w-72'
                    >
                        <FormTextarea
                            id='description'
                            placeholder='Add a more detailed description...'
                            ref={textareaRef}
                            defaultValue={data.description || undefined}
                            errors={fieldErrors}
                            className='h-24 px-3 py-2'
                        />

                        <div className='flex items-center gap-3'>
                            <FormButton>Save</FormButton>
                            <Button
                                variant='default'
                                size='sm'
                                onClick={disableEditing}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        role='button'
                        onClick={enableEditing}
                        className='charlestonGreen h-24 w-52 rounded-md px-3 py-2 text-sm sm:w-72'
                    >
                        {data.description ||
                            'Add a more detailed description...'}
                    </div>
                )}
            </div>
        </div>
    )
}

CardModalDescription.Skeleton = function CardModalDescription() {
    return (
        <div className='flex gap-3'>
            <Skeleton className='charlestonGreen h-6 w-6' />

            <div className='flex flex-col gap-3'>
                <Skeleton className='charlestonGreen h-6 w-52' />
                <Skeleton className='charlestonGreen h-24 w-52 rounded-md sm:w-72' />
            </div>
        </div>
    )
}
