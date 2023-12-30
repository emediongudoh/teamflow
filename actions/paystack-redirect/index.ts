'use server'

import { revalidatePath } from 'next/cache'

// Third party imports
import { auth, currentUser } from '@clerk/nextjs'

// Custom imports
import { db } from '@/lib/db'
import { createSafeAction } from '@/lib/create-safe-action'
import { PaystackRedirect } from './schema'
import { InputType, ReturnType } from './types'
import { absoluteUrl } from '@/lib/utils'

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    const user = await currentUser()

    if (!userId || !orgId || !user) {
        return {
            error: 'Unauthorized',
        }
    }

    const settingsUrl = absoluteUrl(`/organization/${orgId}`)

    let url = ''
    try {
        const orgSubscription = await db.orgSubscription.findUnique({
            where: {
                orgId,
            },
        })

        if (orgSubscription && orgSubscription.paystackCustomerId) {
            //
        } else {
            //
        }
    } catch (error) {
        return {
            error: 'Something went wrong. Try again',
        }
    }

    revalidatePath(`/organization/${orgId}`)
    return { data: url }
}

export const paystackRedirect = createSafeAction(PaystackRedirect, handler)
