import { z } from 'zod'

const runtimeConfigSchema = z.object({
  appEnvironment: z.string().min(1),
})

export const runtimeConfig = runtimeConfigSchema.parse({
  appEnvironment: import.meta.env.MODE,
})

