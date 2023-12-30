import { NextResponse } from 'next/server'

// Third party import
import { auth } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { ENTITY_TYPE } from '@prisma/client'

export async function GET(
    request: Request,
    { params }: { params: { cardId: string } }
) {
    try {
        const { userId, orgId } = auth()
        if (!userId || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const auditLogs = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 3,
        })

        return NextResponse.json(auditLogs)
    } catch (error) {
        return new NextResponse('Internal server error', { status: 500 })
    }
}
