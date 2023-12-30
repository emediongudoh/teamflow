import { auth, currentUser } from '@clerk/nextjs'

// Custom imports
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { db } from '@/lib/db'

interface AuditLogProps {
    entityId: string
    entityTitle: string
    entityType: ENTITY_TYPE
    action: ACTION
}

export const createAuditLog = async (props: AuditLogProps) => {
    try {
        const { orgId } = auth()
        const user = await currentUser()

        if (!user || !orgId) {
            throw new Error('User not found')
        }

        const { entityId, entityTitle, entityType, action } = props

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityTitle,
                entityType,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: `${user?.firstName} ${user?.lastName}`,
            },
        })
    } catch (error) {
        console.log(error)
    }
}
