import { z } from 'zod'

export const UpdateCard = z.object({
    title: z.optional(
        z
            .string({
                required_error: 'Card title is required',
                invalid_type_error: 'Card title is required',
            })
            .min(4, {
                message: 'Card title is too short (min 4 characters)',
            })
    ),
    id: z.string(),
    boardId: z.string(),
    description: z.optional(
        z
            .string({
                required_error: 'Crad description is required',
                invalid_type_error: 'Card description is required',
            })
            .min(4, {
                message: 'Card description is too short (min 4 characters)',
            })
    ),
})
