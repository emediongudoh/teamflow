import { z } from 'zod'

export const UpdateList = z.object({
    title: z
        .string({
            required_error: 'List title is required',
            invalid_type_error: 'List title is required',
        })
        .min(4, {
            message: 'List title is too short (min 4 characters)',
        }),
    id: z.string(),
    boardId: z.string(),
})
