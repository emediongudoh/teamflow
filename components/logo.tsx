import Link from 'next/link'

// Third party import
import { Building2 } from 'lucide-react'

export const Logo = () => {
    return (
        <Link
            href='/'
            className='flex items-center gap-2 sm:text-2xl'
        >
            <Building2 className='siteBg h-8 w-8 rounded-md p-1 text-white' />{' '}
            TeamFlow
        </Link>
    )
}
