'use client'

import { useState, useRef, ElementRef } from 'react'

// Custom imports
import { List } from '@prisma/client'
import { FormInput } from '@/components/form/form-input'
import { useAction } from '@/hooks/use-action'
import { updateList } from '@/actions/update-list'
import { ListOptions } from './list-options'

// Third party imports
import { Button } from '@/components/ui/button'
import { useEventListener } from 'usehooks-ts'
import { toast } from 'sonner'

interface ListTitleProps {
    data: List
    onAddCard: () => void
}

export const ListTitle = ({ data, onAddCard }: ListTitleProps) => {
    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<'form'>>(null)
    const inputRef = useRef<ElementRef<'input'>>(null)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const { execute } = useAction(updateList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" updated`)
            setTitle(data.title)
            disableEditing()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        if (title === data.title) {
            return disableEditing()
        }

        execute({ title, id, boardId })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit()
        }
    }

    useEventListener('keydown', onKeyDown)

    return (
        <div className='flex items-center justify-between'>
            {isEditing ? (
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='flex w-96 flex-col gap-3'
                >
                    <input
                        type='hidden'
                        id='id'
                        name='id'
                        value={data.id}
                    />
                    <input
                        type='hidden'
                        id='boardId'
                        name='boardId'
                        value={data.boardId}
                    />
                    <FormInput
                        ref={inputRef}
                        id='title'
                        placeholder='Enter list title...'
                        defaultValue={title}
                        onBlur={onBlur}
                    />
                </form>
            ) : (
                <>
                    <Button
                        variant='transparent'
                        className='truncate rounded-none'
                        onClick={enableEditing}
                    >
                        {title}
                    </Button>

                    <ListOptions
                        data={data}
                        onAddCard={onAddCard}
                    />
                </>
            )}
        </div>
    )
}
