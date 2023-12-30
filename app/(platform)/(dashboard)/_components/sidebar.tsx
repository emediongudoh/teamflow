'use client'

import Link from 'next/link'

// Third party imports
import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalStorage } from 'usehooks-ts'
import { Plus } from 'lucide-react'

// Custom imports
import { SidebarItem, Organization } from './sidebar-item'

interface SidebarProps {
    storageKey?: string
}

export const Sidebar = ({
    storageKey = 'teamflow-sidebar-desktop',
}: SidebarProps) => {
    const { organization: activeOrganization, isLoaded: isLoadedOrg } =
        useOrganization()
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: { infinite: true },
    })

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    )

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }

            return acc
        },
        []
    )

    const onExpand = (id: string) => {
        setExpanded(current => ({
            ...current,
            [id]: !expanded[id],
        }))
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <div className='flex flex-col gap-6 md:w-72'>
                <div className='flex items-center justify-between gap-3'>
                    <Skeleton className='charlestonGreen h-6 flex-1' />
                    <Skeleton className='charlestonGreen h-6 w-6' />
                </div>

                <div className='flex flex-col gap-3'>
                    <SidebarItem.Skeleton />
                    <SidebarItem.Skeleton />
                    <SidebarItem.Skeleton />
                    <SidebarItem.Skeleton />
                    <SidebarItem.Skeleton />
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-6 overflow-y-auto md:w-72'>
            <div className='flex items-center justify-between'>
                Workspaces{' '}
                <Button
                    variant='charlestonGreen'
                    size='icon'
                    className='rounded-full'
                >
                    <Link href='/select-org'>
                        <Plus className='h-4 w-4' />
                    </Link>
                </Button>
            </div>

            <Accordion
                type='multiple'
                defaultValue={defaultAccordionValue}
                className='flex flex-col gap-3'
            >
                {userMemberships.data.map(({ organization }) => (
                    <SidebarItem
                        key={organization.id}
                        organization={organization as Organization}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded={expanded[organization.id]}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </div>
    )
}
