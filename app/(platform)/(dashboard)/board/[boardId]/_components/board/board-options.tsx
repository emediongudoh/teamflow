'use client'

import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover'
import { MoreHorizontal, Trash } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { deleteBoard } from '@/actions/delete-board'
import { useAction } from '@/hooks/use-action'

interface BoardOptionsProps {
    id: string
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: error => {
            toast.error(error)
        },
    })

    const onDelete = () => {
        execute({ id })
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
                className='chineseBlack max-w-xs border-none'
            >
                <Button
                    variant='transparent'
                    size='sm'
                    disabled={isLoading}
                    onClick={onDelete}
                    className='p-0'
                >
                    <Trash className='mr-2 h-4 w-4' /> Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}
