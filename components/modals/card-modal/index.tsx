'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'

// Custom imports
import { useCardModal } from '@/hooks/use-card-modal'
import { CardWithList } from '@/types'
import { fetcher } from '@/lib/fetcher'
import { AuditLog } from '@prisma/client'
import { CardModalTitle } from './card-modal-title'
import { CardModalDescription } from './card-modal-description'
import { CardModalActions } from './card-modal-actions'
import { CardModalActivity } from './card-modal-activity'

export const CardModal = () => {
    const id = useCardModal(state => state.id)
    const isOpen = useCardModal(state => state.isOpen)
    const onClose = useCardModal(state => state.onClose)

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/card/${id}`),
    })

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/card/${id}/logs`),
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className='raisinBlack flex flex-col gap-4 border-none sm:gap-6'>
                {!cardData ? (
                    <CardModalTitle.Skeleton />
                ) : (
                    <CardModalTitle data={cardData} />
                )}

                <div className='grid grid-cols-12 gap-4 sm:gap-6'>
                    <div className='col-span-full sm:col-span-9'>
                        {!cardData ? (
                            <CardModalDescription.Skeleton />
                        ) : (
                            <CardModalDescription data={cardData} />
                        )}
                    </div>

                    <div className='col-span-full flex flex-col gap-3 sm:col-span-3'>
                        {!cardData ? (
                            <CardModalActions.Skeleton />
                        ) : (
                            <CardModalActions data={cardData} />
                        )}
                    </div>
                </div>

                {!auditLogsData ? (
                    <CardModalActivity.Skeleton />
                ) : (
                    <CardModalActivity data={auditLogsData} />
                )}
            </DialogContent>
        </Dialog>
    )
}
