import { Suspense } from 'react'

// Third party imports
import { OrganizationInfo } from './_components/organization-info'
import { BoardList } from './_components/board-list'

export default async function OrganizationIdPage() {
    return (
        <div className='flex flex-col gap-6'>
            <OrganizationInfo />

            <Suspense fallback={<BoardList.Skeleton />}>
                <BoardList />
            </Suspense>
        </div>
    )
}
