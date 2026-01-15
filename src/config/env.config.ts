import { z } from 'zod'

const envShema = z.object({
  NODE_ENV: z.string(),
  PORT: z.string().regex(/^\d+$/).optional(),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  SALT_ROUNDS: z.string().regex(/^\d+$/),
  JWT_SECRET: z.string(),
  PINO_LOG_LEVEL: z.string()
})

envShema.parse(process.env)

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envShema> { }
  }
}
