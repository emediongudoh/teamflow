import { z } from 'zod'

// Custom imports
import { ActionState } from '@/lib/create-safe-action'
import { PaystackRedirect } from './schema'

export type InputType = z.infer<typeof PaystackRedirect>
export type ReturnType = ActionState<InputType, string>
