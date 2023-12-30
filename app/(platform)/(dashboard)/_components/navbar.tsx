import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

// Custom imports
import { Logo } from '@/components/logo'
import { FormPopover } from '@/components/form/form-popover'
import { MobileSidebar } from './mobile-sidebar'

export const Navbar = () => {
    return (
        <div className='charlestonGreen sticky top-0 z-50 flex items-center justify-between p-4 shadow'>
            <MobileSidebar />

            <div className='flex items-center gap-4'>
                <div className='hidden sm:block'>
                    <Logo />
                </div>

                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl='/organization/:id'
                    afterLeaveOrganizationUrl='/select-org'
                    afterSelectOrganizationUrl='/organization/:id'
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        },
                    }}
                />

                <FormPopover
                    align='start'
                    side='bottom'
                    sideOffset={20}
                >
                    <Button
                        variant='primary'
                        size='sm'
                        className='hidden sm:block'
                    >
                        Create
                    </Button>
                </FormPopover>
            </div>

            <UserButton afterSignOutUrl='/' />
        </div>
    )
}
