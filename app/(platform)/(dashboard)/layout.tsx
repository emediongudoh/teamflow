import { Button } from '@/components/ui/button'

// Custom imports
import { Navbar } from './_components/navbar'
import { FormPopover } from '@/components/form/form-popover'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}

            <FormPopover
                align='start'
                side='top'
                sideOffset={20}
            >
                <Button
                    variant='primary'
                    size='sm'
                    className='fixed bottom-4 right-4 block sm:hidden'
                >
                    Create
                </Button>
            </FormPopover>
        </>
    )
}
