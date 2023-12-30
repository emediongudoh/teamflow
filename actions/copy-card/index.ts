'use server'

import { revalidatePath } from 'next/cache'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { CopyCard } from './schema'
import { InputType, ReturnType } from './types'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: 'Unauthorized',
        }
    }

    const { id, boardId } = data

    let card
    try {
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        })
        if (!cardToCopy) {
            return { error: 'Card not found' }
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId,
            },
            orderBy: { order: 'desc' },
            select: { order: true },
        })
        const newOrder = lastCard ? lastCard.order + 1 : 1

        card = await db.card.create({
            data: {
                listId: cardToCopy.listId,
                title: `${cardToCopy.title} - copy`,
                order: newOrder,
                description: cardToCopy.description,
            },
        })

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
        })
    } catch (error) {
        return {
            error: 'Failed to copy card',
        }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
