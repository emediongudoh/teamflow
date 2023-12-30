'use client'

import { forwardRef, useRef, ElementRef, KeyboardEventHandler } from 'react'
import { useParams } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useOnClickOutside, useEventListener } from 'usehooks-ts'
import { toast } from 'sonner'

// Custom imports
import { createCard } from '@/actions/create-card'
import { useAction } from '@/hooks/use-action'
import { FormTextarea } from '@/components/form/form-textarea'
import { FormButton } from '@/components/form/form-button'

interface CardFormProps {
    listId: string
    isEditing: boolean
    enableEditing: () => void
    disableEditing: () => void
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        const params = useParams()

        const formRef = useRef<ElementRef<'form'>>(null)

        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess: data => {
                toast.success(`Card "${data.title}" created`)
                formRef.current?.reset()
            },
            onError: error => {
                toast.error(error)
            },
        })

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                disableEditing()
            }
        }

        useEventListener('keydown', onKeyDown)
        useOnClickOutside(formRef, disableEditing)

        const onTextareakeydown: KeyboardEventHandler<
            HTMLTextAreaElement
        > = e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                formRef.current?.requestSubmit()
            }
        }

        const onSubmit = (formData: FormData) => {
            const title = formData.get('title') as string
            const listId = formData.get('listId') as string
            const boardId = params.boardId as string

            execute({ title, listId, boardId })
        }

        if (isEditing) {
            return (
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='flex flex-col gap-3'
                >
                    <FormTextarea
                        ref={ref}
                        errors={fieldErrors}
                        id='title'
                        placeholder='Enter card title...'
                        onKeyDown={onTextareakeydown}
                    />
                    <input
                        type='hidden'
                        name='listId'
                        value={listId}
                    />

                    <div className='flex items-center gap-1'>
                        <FormButton>Add card</FormButton>
                        <Button
                            variant='transparent'
                            size='icon'
                            onClick={disableEditing}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                </form>
            )
        }

        return (
            <Button
                variant='transparent'
                size='sm'
                className='flex w-full items-center justify-start'
                onClick={enableEditing}
            >
                <Plus className='mr-2 h-4 w-4' /> Add a card
            </Button>
        )
    }
)

CardForm.displayName = 'CardForm'
