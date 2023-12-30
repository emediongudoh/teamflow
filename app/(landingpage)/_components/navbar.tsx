import Link from 'next/link'

// Third party imports
import { Button } from '@/components/ui/button'

// Custom import
import { Logo } from '@/components/logo'

export const Navbar = () => {
    return (
        <div className='sticky top-0 flex items-center justify-between p-4'>
            <Logo />

            <div className='flex items-center gap-4'>
                <Button variant='raisinBlack'>
                    <Link href='/sign-in'>Log in</Link>
                </Button>
                <Button
                    variant='primary'
                    className='hidden sm:block'
                >
                    <Link href='/sign-up'>Try TeamFlow today!</Link>
                </Button>
            </div>
        </div>
    )
}
