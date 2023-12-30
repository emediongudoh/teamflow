'use client'

import { ElementRef, useRef, useState } from 'react'

// Third party imports
import { Draggable, Droppable } from '@hello-pangea/dnd'

// Custom imports
import { ListWithCards } from '@/types'
import { ListTitle } from './list-title'
import { CardForm } from '../card/card-form'
import { CardItem } from '../card/card-item'

interface ListItemProps {
    data: ListWithCards
    index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
    const textareaRef = useRef<ElementRef<'textarea'>>(null)

    const [isEditing, setIsEditing] = useState(false)

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    return (
        <Draggable
            draggableId={data.id}
            index={index}
        >
            {provided => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='raisinBlack flex w-64 flex-none flex-col gap-1 self-start rounded-md p-4 text-sm sm:w-80'
                >
                    <div {...provided.dragHandleProps}>
                        <ListTitle
                            data={data}
                            onAddCard={enableEditing}
                        />
                    </div>

                    <Droppable
                        droppableId={data.id}
                        type='card'
                    >
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className='flex flex-col gap-3'
                            >
                                {data.cards.map((card, index) => (
                                    <CardItem
                                        key={card.id}
                                        index={index}
                                        data={card}
                                    />
                                ))}

                                <div className='px-0.5 py-1'>
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>

                    <CardForm
                        listId={data.id}
                        ref={textareaRef}
                        isEditing={isEditing}
                        enableEditing={enableEditing}
                        disableEditing={disableEditing}
                    />
                </div>
            )}
        </Draggable>
    )
}
