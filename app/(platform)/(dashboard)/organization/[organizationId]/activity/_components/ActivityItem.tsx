import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { format } from 'date-fns'

// Custom imports
import { AuditLog } from '@prisma/client'
import { generateLogMessage } from '@/lib/generate-log-message'

interface ActivityItemProps {
    data: AuditLog
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
    return (
        <div className='raisinBlack flex items-center gap-3 rounded-md p-3'>
            <Avatar className='h-8 w-8'>
                <AvatarImage src={data.userImage} />
            </Avatar>

            <div className='flex flex-col gap-1 text-sm'>
                <h2>
                    {data.userName} {generateLogMessage(data)}
                </h2>
                <p className='text-xs text-slate-300'>
                    {format(
                        new Date(data.createdAt),
                        "MMM d, yyyy 'at' h:mm a"
                    )}
                </p>
            </div>
        </div>
    )
}
