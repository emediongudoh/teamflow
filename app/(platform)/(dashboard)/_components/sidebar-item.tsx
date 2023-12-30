'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

// Third party imports
import {
    AccordionTrigger,
    AccordionContent,
    AccordionItem,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Activity, CreditCard, Layout, Settings } from 'lucide-react'

export type Organization = {
    id: string
    imageUrl: string
    name: string
    slug: string
}

interface SidebarItemProps {
    organization: Organization
    isActive: boolean
    isExpanded: boolean
    onExpand: (id: string) => void
}

export const SidebarItem = ({
    organization,
    isActive,
    isExpanded,
    onExpand,
}: SidebarItemProps) => {
    const routes = [
        {
            label: 'Boards',
            icon: <Layout className='h-4 w-4' />,
            href: `/organization/${organization.id}`,
        },
        {
            label: 'Activity',
            icon: <Activity className='h-4 w-4' />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: 'Settings',
            icon: <Settings className='h-4 w-4' />,
            href: `/organization/${organization.id}/settings`,
        },
        // {
        //     label: 'Billing',
        //     icon: <CreditCard className='h-4 w-4' />,
        //     href: `/organization/${organization.id}/billing`,
        // },
    ]

    const router = useRouter()
    const pathname = usePathname()

    const onClick = (href: string) => {
        router.push(href)
    }

    return (
        <AccordionItem
            value={organization.id}
            className='border-none'
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    'hover:charlestonGreen flex w-full rounded-md px-3 py-2 hover:no-underline',
                    isActive && !isExpanded && 'charlestonGreen'
                )}
            >
                <div className='flex items-center gap-3 text-sm'>
                    <Image
                        src={organization.imageUrl}
                        alt={organization.name}
                        width='32'
                        height='32'
                        className='rounded-md object-cover'
                    />
                    {organization.name}
                </div>
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-3'>
                {routes.map(route => (
                    <Button
                        key={route.href}
                        variant='default'
                        size='sm'
                        className={cn(
                            'hover:charlestonGreen flex items-center gap-3 bg-transparent text-white',
                            pathname === route.href && 'charlestonGreen'
                        )}
                        onClick={() => onClick(route.href)}
                    >
                        {route.icon} {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}

SidebarItem.Skeleton = function SkeletonSidebarItem() {
    return (
        <div className='flex items-center gap-3'>
            <Skeleton className='charlestonGreen h-12 w-12' />
            <Skeleton className='charlestonGreen h-6 w-6 flex-1' />
        </div>
    )
}
