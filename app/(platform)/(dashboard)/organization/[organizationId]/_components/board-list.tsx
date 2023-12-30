import Link from 'next/link'
import { redirect } from 'next/navigation'

// Third party imports
import { auth } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import { HelpingHandIcon, User } from 'lucide-react'

// Custom imports
import { FormPopover } from '@/components/form/form-popover'
import { FormTooltip } from '@/components/form/form-tooltip'
import { db } from '@/lib/db'
import { getAvailableCount } from '@/lib/org-limit'
import { MAX_FREE_BOARDS } from '@/constants/boards'

export const BoardList = async () => {
    const { orgId } = auth()
    if (!orgId) {
        return redirect('/select-org')
    }

    const boards = await db.board.findMany({
        where: {
            orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const availableCount = await getAvailableCount()

    return (
        <>
            <h2 className='flex items-center gap-3'>
                <User className='h-6 w-6' /> Your boards
            </h2>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4'>
                {boards.map(board => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        style={{
                            backgroundImage: `url(${board.imageThumbUrl})`,
                        }}
                        className='siteBorderColor relative aspect-video h-28 w-full rounded-md border-2 bg-cover bg-no-repeat text-white'
                    >
                        <span className='absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 text-center text-sm'>
                            {board.title}
                        </span>
                    </Link>
                ))}

                <FormPopover
                    side='left'
                    sideOffset={20}
                >
                    <div
                        role='button'
                        className='raisinBlack relative flex aspect-video h-28 w-full flex-col items-center justify-center gap-1 rounded-md'
                    >
                        <p className='text-sm'>Create new board</p>
                        <span className='text-xs'>
                            {`${MAX_FREE_BOARDS - availableCount}`} remaining
                        </span>

                        <FormTooltip
                            sideOffset={40}
                            description={`Create up to 5 workspaces. Upgrade for unlimited boards!`}
                        >
                            <HelpingHandIcon className='absolute bottom-4 right-4 h-6 w-6' />
                        </FormTooltip>
                    </div>
                </FormPopover>
            </div>
        </>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <>
            <Skeleton className='raisinBlack h-6 w-52' />

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4'>
                <Skeleton className='raisinBlack aspect-square h-28 w-full' />
                <Skeleton className='raisinBlack aspect-square h-28 w-full' />
                <Skeleton className='raisinBlack aspect-square h-28 w-full' />
                <Skeleton className='raisinBlack aspect-square h-28 w-full' />
                <Skeleton className='raisinBlack aspect-square h-28 w-full' />
            </div>
        </>
    )
}
