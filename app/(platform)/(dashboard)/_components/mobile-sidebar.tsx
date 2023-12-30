'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// Third party imports
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

// Custom imports
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    const isOpen = useMobileSidebar(state => state.isOpen)
    const onOpen = useMobileSidebar(state => state.onOpen)
    const onClose = useMobileSidebar(state => state.onClose)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <Button
                variant='raisinBlack'
                size='sm'
                className='block md:hidden'
                onClick={onOpen}
            >
                <Menu className='h-6 w-6' />
            </Button>

            <Sheet
                open={isOpen}
                onOpenChange={onClose}
            >
                <SheetContent
                    side='left'
                    className='raisinBlack w-72 py-12'
                >
                    <Sidebar storageKey='teamflow-sidebar-mobile' />
                </SheetContent>
            </Sheet>
        </>
    )
}
