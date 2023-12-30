import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip'

interface FormTooltipProps {
    children: React.ReactNode
    description: string
    side?: 'left' | 'right' | 'top' | 'bottom'
    sideOffset?: number
}

export const FormTooltip = ({
    children,
    description,
    side = 'bottom',
    sideOffset = 0,
}: FormTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className='charlestonGreen max-w-xs break-words border-none text-center text-xs leading-loose'
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
