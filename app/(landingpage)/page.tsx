import Link from 'next/link'

// Third party import
import { Button } from '@/components/ui/button'

export default function LandingPage() {
    return (
        <div className='flex flex-col items-center gap-6 px-4 py-24'>
            <h2 className='flex flex-col gap-3 text-center text-xl font-semibold sm:text-5xl'>
                Effortless Organization, <br />
                <span className='siteText'>Seamless Collaboration</span>
            </h2>

            <p className='text-center leading-loose'>
                Revolutionize <span className='badge'>task management</span>.
                Simple, <span className='badge'>collaborative</span>, and
                powerful.
            </p>

            <Button
                variant='primary'
                className='text-base'
            >
                <Link href='/sign-up'>Try TeamFlow today!</Link>
            </Button>
        </div>
    )
}
