import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  DEBUG: z.coerce.boolean().default(false),
})

export const env = envSchema.parse(process.env)