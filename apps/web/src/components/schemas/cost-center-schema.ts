import { z } from 'zod'

export const CostCenterSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
    description: z.string().optional(),
    fatherId: z.string().optional(),
})

export type CostCenterPayload = z.infer<typeof CostCenterSchema>
