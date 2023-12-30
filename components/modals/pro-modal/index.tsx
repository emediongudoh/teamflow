'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

// Custom import
import { useProModal } from '@/hooks/use-pro-modal'
import Image from 'next/image'

export const ProModal = () => {
    const { isOpen, onClose } = useProModal()

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className='chineseBlack flex flex-col gap-3 border-none text-center'>
                <div className='relative flex aspect-video items-center justify-center'>
                    <Image
                        src='/upgrade.png'
                        alt='Upgrade PNG'
                        fill
                        className='object-contain'
                    />
                </div>

                <h2>Upgrade to TeamFlow Pro Today!</h2>
                <p className='text-sm leading-loose'>
                    Enjoy features like unlimited boards with beautiful
                    background images from unsplash API.
                </p>

                <Button
                    variant='primary'
                    className='self-center'
                >
                    Coming soon...
                </Button>
            </DialogContent>
        </Dialog>
    )
}
