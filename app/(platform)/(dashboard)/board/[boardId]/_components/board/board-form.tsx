'use client'

import { ElementRef, useRef, useState } from 'react'

// Third party imports
import { toast } from 'sonner'
import { HelpingHandIcon } from 'lucide-react'

// Custom imports
import { Board } from '@prisma/client'
import { updateBoard } from '@/actions/update-board'
import { useAction } from '@/hooks/use-action'
import { FormInput } from '@/components/form/form-input'
import { FormTooltip } from '@/components/form/form-tooltip'

interface BoardFormProps {
    data: Board
}

export const BoardForm = ({ data }: BoardFormProps) => {
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

    const { execute } = useAction(updateBoard, {
        onSuccess: data => {
            toast.success(`Board "${data.title}" updated`)
            setTitle(data.title)
            disableEditing()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string

        execute({ title, id: data.id })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                ref={formRef}
                className='w-80'
            >
                <FormInput
                    id='title'
                    defaultValue={title}
                    ref={inputRef}
                    onBlur={onBlur}
                    className='flex justify-center bg-transparent focus:bg-transparent'
                />
            </form>
        )
    }

    return (
        <div
            role='button'
            className='flex items-center gap-3 bg-transparent hover:bg-transparent'
            onClick={enableEditing}
        >
            {title}

            <FormTooltip
                sideOffset={40}
                description={`Click on the board title to make changes!`}
            >
                <HelpingHandIcon className='h-6 w-6' />
            </FormTooltip>
        </div>
    )
}
