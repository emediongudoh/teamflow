'use client'

import { Skeleton } from '@/components/ui/skeleton'

// Third party import
import { Activity } from 'lucide-react'

// Custom imports
import { AuditLog } from '@prisma/client'
import { CardModalActivityItem } from './card-modal-activity-item'

interface CardModalActivityProps {
    data: AuditLog[]
}

export const CardModalActivity = ({ data }: CardModalActivityProps) => {
    return (
        <div className='flex gap-3'>
            <Activity className='h-6 w-6' />

            <div className='flex flex-col gap-3'>
                <h2 className='text-slate-300'>Activity</h2>

                {data.map(item => (
                    <CardModalActivityItem
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

CardModalActivity.Skeleton = function CardModalActivitySkeleton() {
    return (
        <div className='flex gap-3'>
            <Skeleton className='charlestonGreen h-6 w-6' />

            <div className='flex flex-col gap-3'>
                <Skeleton className='charlestonGreen h-6 w-52' />
                <Skeleton className='charlestonGreen h-6 w-52 sm:w-72' />
            </div>
        </div>
    )
}
