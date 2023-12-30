'use client'

import { ElementRef, useRef, useState } from 'react'
import { useParams } from 'next/navigation'

// Third party imports
import { Skeleton } from '@/components/ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'
import { Layout } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks/use-action'
import { CardWithList } from '@/types'
import { FormInput } from '@/components/form/form-input'

interface CardModalTitleProps {
    data: CardWithList
}

export const CardModalTitle = ({ data }: CardModalTitleProps) => {
    const queryClient = useQueryClient()
    const params = useParams()

    const { execute } = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id],
            })

            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id],
            })

            toast.success(`Card "${data.title}" updated`)
            setTitle(data.title)
        },
        onError: error => {
            toast.error(error)
        },
    })

    const inputRef = useRef<ElementRef<'input'>>(null)

    const [title, setTitle] = useState(data?.title)
    const [list, setList] = useState(data?.list?.title)

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit()
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const boardId = params.boardId as string

        if (title === data.title) {
            return
        }

        execute({ title, boardId, id: data.id })
    }

    return (
        <div className='flex gap-3'>
            <Layout className='h-6 w-6' />

            <div className='flex flex-col gap-1'>
                <form
                    action={onSubmit}
                    className='w-52 sm:w-72'
                >
                    <FormInput
                        id='title'
                        defaultValue={title}
                        ref={inputRef}
                        onBlur={onBlur}
                    />
                </form>
                <p className='text-xs text-slate-300'>
                    in list <span className='underline'>{list}</span>
                </p>
            </div>
        </div>
    )
}

CardModalTitle.Skeleton = function CardModalTitleSkeleton() {
    return (
        <div className='flex items-center gap-3'>
            <Skeleton className='charlestonGreen h-6 w-6' />

            <div className='flex flex-col gap-1'>
                <Skeleton className='charlestonGreen w-52 sm:w-96' />
                <Skeleton className='charlestonGreen w-52' />
            </div>
        </div>
    )
}
