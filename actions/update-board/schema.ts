import { z } from 'zod'

export const UpdateBoard = z.object({
    title: z
        .string({
            required_error: 'Board title is required',
            invalid_type_error: 'Board title is required',
        })
        .min(4, {
            message: 'Board title is too short (min 4 characters)',
        }),
    id: z.string(),
})
