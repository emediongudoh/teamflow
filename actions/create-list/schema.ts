import { z } from 'zod'

export const CreateList = z.object({
    title: z
        .string({
            required_error: 'List title is required',
            invalid_type_error: 'List title is required',
        })
        .min(4, {
            message: 'List title is too short (min 4 characters)',
        }),
    boardId: z.string(),
})
