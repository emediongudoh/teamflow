'use client'

import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'

// Third party imports
import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'

// Custom imports
import { unsplash } from '@/lib/unsplash'
import { defaultImages } from '@/constants/images'
import { FormErrors } from './form-errors'

interface FormPickerProps {
    id: string
    errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
    const { pending } = useFormStatus()

    const [images, setImages] =
        useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                })

                if (result && result.response) {
                    const newImages = result.response as Array<
                        Record<string, any>
                    >
                    setImages(newImages)
                } else {
                    console.error('Failed to get images from Unsplash')
                }
            } catch (error) {
                console.error(error)
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        }

        fetchImages()
    }, [])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center'>
                <Loader2 className='siteText h-6 w-6 animate-spin' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-1'>
            <div className='grid grid-cols-3 gap-4 text-xs text-white'>
                {images.map(image => (
                    <div
                        key={image.id}
                        role='button'
                        className={cn(
                            'group relative aspect-video rounded-md transition',
                            pending && 'cursor-auto opacity-50 hover:opacity-50'
                        )}
                        onClick={() => {
                            if (pending) return
                            setSelectedImageId(image.id)
                        }}
                    >
                        <input
                            type='radio'
                            name={id}
                            id={id}
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                            className='hidden'
                        />

                        <Image
                            src={image.urls.thumb}
                            alt={image.id}
                            fill
                            className='rounded-md object-cover'
                        />

                        {selectedImageId === image.id && (
                            <div className='absolute inset-0 flex h-full w-full items-center justify-center bg-black/50'>
                                <Check className='h-4 w-4' />
                            </div>
                        )}

                        <Link
                            href={image.links.html}
                            target='_blank'
                            className='absolute bottom-0 w-full truncate bg-black/50 p-1 opacity-0 group-hover:opacity-100'
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>

            <FormErrors
                id='image'
                errors={errors}
            />
        </div>
    )
}
