import { z } from 'zod'

export const CreateBoard = z.object({
    title: z
        .string({
            required_error: 'Board title is required',
            invalid_type_error: 'Board title is required',
        })
        .min(4, {
            message: 'Board title is too short (min 4 characters)',
        }),
    image: z.string({
        required_error: 'Board image is required',
        invalid_type_error: 'Board image is required',
    }),
})
