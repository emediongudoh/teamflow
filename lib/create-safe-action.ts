import { z } from 'zod'

export type FieldErrors<T> = {
    [K in keyof T]?: string[]
}

export type ActionState<TInput, TOutput> = {
    data?: TOutput
    error?: string | null
    fieldErrors?: FieldErrors<TInput>
}

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const parsedData = schema.safeParse(data)
        if (!parsedData.success) {
            return {
                fieldErrors: parsedData.error.flatten()
                    .fieldErrors as FieldErrors<TInput>,
            }
        }

        return handler(parsedData.data)
    }
}
