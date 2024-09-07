import dayjs from 'dayjs'
import { z } from 'zod'

const stringSchema = z
  .string({
    required_error: 'Campo requerido',
    invalid_type_error: 'Campo requerido',
  })
  .min(1, { message: 'Campo requerido' })
  .trim()
  .toLowerCase()

export default z
  .object({
    name: stringSchema,
    lastName: stringSchema,
    civilStatus: stringSchema,
    occupation: stringSchema,
    birthDate: z
      .date({
        required_error: 'Campo requerido',
        invalid_type_error: 'Campo requerido',
      })
      .transform((value) => dayjs(value).format('YYYY-MM-DD')),
    timePracticing: z
      .number({
        required_error: 'Campo requerido',
        invalid_type_error: 'Campo requerido',
      })
      .min(1, { message: 'Debe ser mayor a 1' }),
    periodTime: stringSchema,
    school: stringSchema,
    teacher: stringSchema,
    currentGrade: z.object({
      grade: z
        .number({
          required_error: 'Campo requerido',
          invalid_type_error: 'Campo requerido',
        })
        .min(0),
      level: stringSchema,
    }),
    nextGrade: z
      .object({
        grade: z
          .number({
            required_error: 'Campo requerido',
            invalid_type_error: 'Campo requerido',
          })
          .min(0),
        level: stringSchema,
      })
      .required(),
  })
  .required()
