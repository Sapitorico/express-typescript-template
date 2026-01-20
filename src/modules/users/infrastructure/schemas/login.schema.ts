import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ error: 'INVALID_EMAIL_TYPE' }).trim().nonempty({ error: 'EMAIL_REQUIRED' }).max(254).pipe(z.email({ error: 'INVALID_EMAIL_FORMAT' })),
  password: z.string({ error: 'INVALID_PASSWORD_TYPE' }).trim().nonempty({ error: 'PASSWORD_REQUIRED' }).min(8, { message: 'SHORT_PASSWORD' }).max(64, 'LONG_PASSWORD')
})

export type UserLoginDTO = z.infer<typeof loginSchema>
