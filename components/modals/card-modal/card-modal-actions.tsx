'use client'

import { useParams } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Copy, Trash } from 'lucide-react'
import { toast } from 'sonner'

// Custom imports
import { copyCard } from '@/actions/copy-card'
import { deleteCard } from '@/actions/delete-card'
import { useAction } from '@/hooks/use-action'
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'

interface CardModalActionsProps {
    data: CardWithList
}

export const CardModalActions = ({ data }: CardModalActionsProps) => {
    const params = useParams()
    const cardModal = useCardModal()

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
        copyCard,
        {
            onSuccess: data => {
                toast.success(`Card "${data.title}" copied`)
                cardModal.onClose()
            },
            onError: error => {
                toast.error(error)
            },
        }
    )

    const { execute: executeDeleteCard, isLoading: isLoadingDelete } =
        useAction(deleteCard, {
            onSuccess: data => {
                toast.success(`Card "${data.title}" deleted`)
                cardModal.onClose()
            },
            onError: error => {
                toast.error(error)
            },
        })

    const onCopy = () => {
        const boardId = params.boardId as string

        executeCopyCard({
            id: data.id,
            boardId,
        })
    }

    const onDelete = () => {
        const boardId = params.boardId as string

        executeDeleteCard({
            id: data.id,
            boardId,
        })
    }

    return (
        <>
            <h2 className='text-slate-300'>Actions</h2>

            <div className='flex gap-3 sm:flex-col'>
                <Button
                    variant='charlestonGreen'
                    size='sm'
                    onClick={onCopy}
                    disabled={isLoadingCopy}
                >
                    <Copy className='mr-2 h-4 w-4' /> Copy
                </Button>
                <Button
                    variant='charlestonGreen'
                    size='sm'
                    onClick={onDelete}
                    disabled={isLoadingDelete}
                >
                    <Trash className='mr-2 h-4 w-4' /> Delete
                </Button>
            </div>
        </>
    )
}

CardModalActions.Skeleton = function CardModalActionsSkeleton() {
    return (
        <>
            <Skeleton className='charlestonGreen h-6 w-24' />

            <div className='flex gap-3 sm:flex-col'>
                <Skeleton className='charlestonGreen h-6 w-24' />
                <Skeleton className='charlestonGreen h-6 w-24' />
            </div>
        </>
    )
}
