import { z } from 'zod'

export const CreateCard = z.object({
    title: z
        .string({
            required_error: 'Card title is required',
            invalid_type_error: 'Card title is required',
        })
        .min(4, {
            message: 'Card title is too short (min 4 characters)',
        }),
    boardId: z.string(),
    listId: z.string(),
})
