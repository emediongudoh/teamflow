import { auth } from '@clerk/nextjs'

// Custom import
import { db } from '@/lib/db'

const DAY_IN_MS = 86_400_000

export const checkSubscription = async () => {
    const { orgId } = auth()

    if (!orgId) {
        return false
    }

    const orgSubscription = await db.orgSubscription.findUnique({
        where: {
            orgId,
        },
        select: {
            paystackSubscriptionId: true,
            paystackCurrentPeriodEnd: true,
            paystackCustomerId: true,
            paystackPriceId: true,
        },
    })

    if (!orgSubscription) {
        return false
    }

    const isValid =
        orgSubscription.paystackPriceId &&
        orgSubscription.paystackCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
            Date.now()

    return !!isValid
}
