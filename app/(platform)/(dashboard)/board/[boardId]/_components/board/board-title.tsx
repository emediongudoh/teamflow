import { Board } from '@prisma/client'
import { BoardForm } from './board-form'
import { BoardOptions } from './board-options'

interface BoardTitleProps {
    data: Board
}

export const BoardTitle = async ({ data }: BoardTitleProps) => {
    return (
        <div className='flex items-center justify-between bg-black/50 p-4 text-white'>
            <BoardForm data={data} />
            <BoardOptions id={data.id} />
        </div>
    )
}
