'use client'

import { useEffect, useState } from 'react'

// Third party imports
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { toast } from 'sonner'

// Custom imports
import { updateListOrder } from '@/actions/update-list-order'
import { updateCardOrder } from '@/actions/update-card-order'
import { useAction } from '@/hooks/use-action'
import { ListWithCards } from '@/types'
import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListWrapperProps {
    data: ListWithCards[]
    boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

export const ListWrapper = ({ data, boardId }: ListWrapperProps) => {
    const [orderedData, setOrderedData] = useState(data)

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: data => {
            toast.success(`List reordered`)
        },
        onError: error => {
            toast.error(error)
        },
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: data => {
            toast.success(`Card reordered`)
        },
        onError: error => {
            toast.error(error)
        },
    })

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    const onDragEnd = (result: any) => {
        // Extract relevant information from the drag-and-drop result
        const { destination, source, type } = result

        // Check if there is a valid drop destination
        if (!destination) {
            // If no valid destination, exit the function
            return
        }

        // Check if the drag happened within the same droppable and if the order hasn't changed
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            // If the drop happened in the same position, exit the function
            return
        }

        // Handle list drag-and-drop
        if (type === 'list') {
            // Reorder the lists based on the drag-and-drop result
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({ ...item, order: index }))

            // Update the state with the new order of lists
            setOrderedData(items)

            // Execute a function to update the list order on the server
            executeUpdateListOrder({ items, boardId })
        }

        // Handle card drag-and-drop
        if (type === 'card') {
            // Create a copy of the current state data
            let newOrderedData = [...orderedData]

            // Find the source and destination lists based on droppable IDs
            const sourceList = newOrderedData.find(
                list => list.id === source.droppableId
            )
            const destList = newOrderedData.find(
                list => list.id === destination.droppableId
            )

            // Check if source and destination lists are valid
            if (!sourceList || !destList) {
                // If not valid, exit the function
                return
            }

            if (!sourceList.cards) {
                sourceList.cards = []
            }

            if (!destList.cards) {
                destList.cards = []
            }

            // Check if the drag is within the same list
            if (source.droppableId === destination.droppableId) {
                // Reorder the cards within the source list
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )

                // Update the order property of each card
                reorderedCards.forEach((card, index) => {
                    card.order = index
                })

                // Update the source list with the reordered cards
                sourceList.cards = reorderedCards

                // Update the state with the new order of cards
                setOrderedData(newOrderedData)

                // Execute a function to update the card order on the server
                executeUpdateCardOrder({ items: reorderedCards, boardId })
            } else {
                // Handle drag between different lists

                // Remove the moved card from the source list
                const [movedCard] = sourceList.cards.splice(source.index, 1)

                // Update the list ID of the moved card to the destination list
                movedCard.listId = destination.droppableId

                // Insert the moved card at the destination index in the destination list
                destList.cards.splice(destination.index, 0, movedCard)

                // Update the order property of cards in both the source and destination lists
                sourceList.cards.forEach((card, index) => {
                    card.order = index
                })

                destList.cards.forEach((card, index) => (card.order = index))

                // Update the state with the new order of lists
                setOrderedData(newOrderedData)

                // Execute a function to update the card order on the server
                executeUpdateCardOrder({ items: destList.cards, boardId })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId='lists'
                type='list'
                direction='horizontal'
            >
                {provided => (
                    <div
                        className='mx-auto flex max-w-5xl gap-4 overflow-x-scroll p-4 text-white sm:gap-6 sm:p-8'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {orderedData.map((list, index) => (
                            <ListItem
                                key={list.id}
                                index={index}
                                data={list}
                            />
                        ))}

                        {provided.placeholder}

                        <div className='w-64 flex-none sm:w-80'>
                            <ListForm />
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
