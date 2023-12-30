'use server'

import { revalidatePath } from 'next/cache'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { createAuditLog } from '@/lib/create-audit-log'
import { incrementAvailableCount, hasAvailableCount } from '@/lib/org-limit'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { CreateBoard } from './schema'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        }
    }

    const canCreate = await hasAvailableCount()
    if (!canCreate) {
        return {
            error: 'You have reached your limit of free boards. To create more boards, please consider upgrading your account.',
        }
    }

    const { title, image } = data

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
        image.split('|')
    if (
        !imageId ||
        !imageThumbUrl ||
        !imageFullUrl ||
        !imageLinkHTML ||
        !imageUserName
    ) {
        return {
            error: 'Failed to create board',
        }
    }

    let board
    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            },
        })

        await incrementAvailableCount()

        await createAuditLog({
            entityId: board.id,
            entityTitle: board.title,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        })
    } catch (error) {
        return {
            error: 'Failed to create board',
        }
    }

    revalidatePath(`/board/${board.id}`)
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler)
