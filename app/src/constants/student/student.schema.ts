import * as yup from 'yup'

const stringSchema = yup.string().trim().lowercase().required('Campo requerido')

const enumStringSchema = (values: string[]) =>
  yup
    .string()
    .oneOf(values, `Valor debe ser uno de: ${values.join(', ')}`)
    .trim()
    .lowercase()
    .required('Campo requerido')

const numberSchema = yup
  .number()
  .transform((value) => (value ? Number(value) : 0))
  .required('Campo requerido')

export default yup.object().shape({
  name: stringSchema,
  lastName: stringSchema,
  curp: yup.string().trim().uppercase().required('Campo requerido'),
  ruf: yup.string().trim().uppercase(),
  civilStatus: stringSchema,
  occupation: stringSchema,
  birthDate: yup
    .date()
    .nullable()
    .required('Campo requerido')
    .max(new Date(), 'La fecha de nacimiento no puede ser una fecha futura'),
  enrollmentDate: yup
    .date()
    .nullable()
    .required('Campo requerido')
    .max(new Date(), 'La fecha de inscripción no puede ser una fecha futura'),
  priorExperienceDays: numberSchema.min(0),
  isActive: yup.boolean().default(true).required('Campo requerido'),
  grade: yup.object().shape({
    value: numberSchema.min(1).max(11),
    level: enumStringSchema(['kup', 'poom', 'dan']),
    lastGradeUpdatedAt: yup.date().optional(),
  }),
  schoolId: yup.string().trim().required('Campo requerido'),
  teacherId: yup.string().trim().required('Campo requerido'),
  tutorId: yup
    .string()
    .trim()
    .when('$isAdultStudent', {
      is: false,
      then: (schema) =>
        schema.required('Estudiante menor de edad requiere tutor'),
    }),
  userId: yup.string().trim().optional(),
  email: yup
    .string()
    .trim()
    .email('Correo electrónico inválido')
    .when('$isAdultStudent', {
      is: true,
      then: (schema) => schema.required('Campo requerido'),
    }),
})
