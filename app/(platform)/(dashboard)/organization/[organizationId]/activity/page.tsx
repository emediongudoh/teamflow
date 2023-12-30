import { Suspense } from 'react'

// Custom imports
import { OrganizationInfo } from '../_components/organization-info'
import { ActivityList } from './_components/ActivityList'

export default function ActivityPage() {
    return (
        <div className='flex flex-col gap-6'>
            <OrganizationInfo />

            <Suspense fallback={<ActivityList.Skeleton />}>
                <ActivityList />
            </Suspense>
        </div>
    )
}
