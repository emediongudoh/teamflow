import { redirect } from 'next/navigation'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { ListWrapper } from './_components/list/list-wrapper'

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
    const { orgId } = auth()
    if (!orgId) {
        redirect('/select-org')
    }

    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId,
            },
        },
        include: {
            cards: {
                orderBy: {
                    order: 'asc',
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    })

    return (
        <ListWrapper
            boardId={params.boardId}
            data={lists}
        />
    )
}
