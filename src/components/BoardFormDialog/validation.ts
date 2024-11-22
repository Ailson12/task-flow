import { object, string } from 'zod'

export const validationSchema = object({
  title: string({
    required_error: 'Campo obrigatório',
  })
    .min(5, 'Deve conter no mínimo 500 caracteres')
    .max(250, 'Deve conter no máximo 250 caracteres'),
  description: string()
    .max(500, 'Deve conter no máximo 500 caracteres')
    .optional(),
})
