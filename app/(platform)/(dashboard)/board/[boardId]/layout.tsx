import { notFound, redirect } from 'next/navigation'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { BoardTitle } from './_components/board/board-title'

export async function generateMetadata({
    params,
}: {
    params: { boardId: string }
}) {
    const { orgId } = auth()
    if (!orgId) {
        return {
            title: 'Board',
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        },
    })

    return {
        title: board?.title || 'Board',
    }
}

export default async function BoardIdLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { boardId: string }
}) {
    const { orgId } = auth()
    if (!orgId) {
        redirect('/select-org')
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId,
        },
    })

    if (!board) {
        notFound()
    }

    return (
        <div
            className='h-full w-full bg-black/50 bg-cover bg-fixed bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <BoardTitle data={board} />

            {children}
        </div>
    )
}
