import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().nonempty({ error: 'Required' }).max(254).pipe(z.email()),
  password: z.string().trim().nonempty({ error: 'Required' }).min(8).max(64)
})

export type UserLoginDTO = z.infer<typeof loginSchema>
