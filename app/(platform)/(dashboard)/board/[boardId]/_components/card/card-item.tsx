'use client'

import { Draggable } from '@hello-pangea/dnd'

// Custom imports
import { Card } from '@prisma/client'
import { useCardModal } from '@/hooks/use-card-modal'

interface CardItemProps {
    data: Card
    index: number
}

export const CardItem = ({ data, index }: CardItemProps) => {
    const cardModal = useCardModal()

    return (
        <Draggable
            draggableId={data.id}
            index={index}
        >
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role='button'
                    onClick={() => cardModal.onOpen(data.id)}
                    className='charlestonGreen truncate rounded-md px-3 py-2'
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}
