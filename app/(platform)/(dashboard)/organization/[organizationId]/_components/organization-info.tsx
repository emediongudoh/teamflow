'use client'

import Image from 'next/image'

// Third party imports
import { useOrganization } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import { CreditCard } from 'lucide-react'

export const OrganizationInfo = () => {
    const { organization, isLoaded } = useOrganization()

    if (!isLoaded) {
        return <OrganizationInfo.Skeleton />
    }

    return (
        <div className='flex items-center gap-3'>
            <Image
                src={organization?.imageUrl!}
                alt={organization?.name!}
                className='rounded-md object-cover'
                width='48'
                height='48'
            />

            <span>{organization?.name} workspace</span>
            <span className='flex items-center gap-1 rounded-md bg-yellow-500 px-2 py-1 text-black'>
                <CreditCard className='h-4 w-4' /> Free
            </span>
        </div>
    )
}

OrganizationInfo.Skeleton = function SkeletonOrganizationInfo() {
    return (
        <div className='flex items-center gap-3'>
            <Skeleton className='raisinBlack h-12 w-12 rounded-md' />
            <Skeleton className='raisinBlack h-6 w-52' />

            <span className='raisinBlack flex items-center gap-1 rounded-md px-2 py-1'>
                <Skeleton className='raisinBlack h-4 w-4' />{' '}
                <Skeleton className='raisinBlack h-4 w-8' />
            </span>
        </div>
    )
}
