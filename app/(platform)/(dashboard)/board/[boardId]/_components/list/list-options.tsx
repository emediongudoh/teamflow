'use client'

import { ElementRef, useRef } from 'react'

// Third party imports
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { List } from '@prisma/client'
import { deleteList } from '@/actions/delete-list'
import { copyList } from '@/actions/copy-list'
import { useAction } from '@/hooks/use-action'
import { FormButton } from '@/components/form/form-button'

interface ListOptionsProps {
    data: List
    onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" deleted`)
            closeRef.current?.click()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" copied`)
            closeRef.current?.click()
        },
        onError: error => {
            toast.error(error)
        },
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string
        const boardId = formData.get('boardId') as string

        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='transparent'
                    size='icon'
                >
                    <MoreHorizontal className='h-6 w-6' />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align='start'
                side='bottom'
                className='chineseBlack flex max-w-xs flex-col items-start gap-1 border-none text-sm'
            >
                <div className='flex items-center justify-between self-stretch'>
                    <h2 className='text-slate-300'>List actions</h2>

                    <PopoverClose
                        asChild
                        ref={closeRef}
                    >
                        <Button
                            variant='raisinBlack'
                            size='icon'
                        >
                            <X className='h-4 w-4' />
                        </Button>
                    </PopoverClose>
                </div>

                <Button
                    variant='transparent'
                    size='sm'
                    className='p-0'
                    onClick={onAddCard}
                >
                    Add card...
                </Button>

                <form action={onCopy}>
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
                    <FormButton className='chineseBlack hover:chineseBlack p-0'>
                        Copy list...
                    </FormButton>
                </form>

                <form action={onDelete}>
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
                    <FormButton className='chineseBlack hover:chineseBlack p-0'>
                        Delete list...
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}
