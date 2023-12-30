'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'
import { decrementAvailableCount } from '@/lib/org-limit'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { DeleteBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        }
    }

    const { id } = data

    let board
    try {
        board = await db.board.delete({
            where: {
                id,
                orgId,
            },
        })

        await decrementAvailableCount()

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.DELETE,
        })
    } catch (error) {
        return {
            error: 'Failed to delete board',
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
