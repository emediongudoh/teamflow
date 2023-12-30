import { redirect } from 'next/navigation'

// Third party imports
import { auth } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'

// Custom imports
import { db } from '@/lib/db'
import { ActivityItem } from './ActivityItem'

export const ActivityList = async () => {
    const { orgId } = auth()
    if (!orgId) {
        redirect('/select-organization')
    }

    const auditLogs = await db.auditLog.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className='flex flex-col gap-3'>
            <p className='hidden text-sm last:block'>
                There are no activities in this organization yet.
            </p>

            {auditLogs.map(log => (
                <ActivityItem
                    key={log.id}
                    data={log}
                />
            ))}
        </div>
    )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <div className='flex flex-col gap-3'>
            <Skeleton className='raisinBlack h-12 w-96' />
            <Skeleton className='raisinBlack h-12 w-96' />
            <Skeleton className='raisinBlack h-12 w-96' />
            <Skeleton className='raisinBlack h-12 w-96' />
            <Skeleton className='raisinBlack h-12 w-96' />
        </div>
    )
}
