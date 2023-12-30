'use client'

import { useState, useRef, ElementRef } from 'react'
import { useParams, useRouter } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { toast } from 'sonner'

// Custom imports
import { createList } from '@/actions/create-list'
import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/form-input'
import { FormButton } from '@/components/form/form-button'
import { ListCard } from './list-card'

export const ListForm = () => {
    const router = useRouter()
    const params = useParams()

    const formRef = useRef<ElementRef<'form'>>(null)
    const inputRef = useRef<ElementRef<'input'>>(null)

    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" created`)
            disableEditing()
            router.refresh()
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

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const boardId = formData.get('boardId') as string

        execute({ title, boardId })
    }

    if (isEditing) {
        return (
            <ListCard>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='flex flex-col gap-3'
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id='title'
                        placeholder='Enter list title...'
                    />
                    <input
                        type='hidden'
                        name='boardId'
                        value={params.boardId}
                    />

                    <div className='flex items-center gap-1'>
                        <FormButton>Add list</FormButton>
                        <Button
                            variant='transparent'
                            size='icon'
                            onClick={disableEditing}
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </div>
                </form>
            </ListCard>
        )
    }

    return (
        <ListCard>
            <Button
                variant='chineseBlack'
                size='sm'
                className='flex w-full items-center justify-start text-white'
                onClick={enableEditing}
            >
                <Plus className='mr-2 h-4 w-4' /> Add a list
            </Button>
        </ListCard>
    )
}
