import { object, string } from 'zod'

export const validationSchema = object({
  title: string().min(5).max(250),
  description: string().max(500),
})
