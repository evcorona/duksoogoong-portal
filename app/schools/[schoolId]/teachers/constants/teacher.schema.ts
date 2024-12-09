import * as yup from 'yup'

const stringSchema = yup.string().trim().lowercase().required('Campo requerido')

const numberSchema = yup
  .number()
  .transform((value) => (value ? Number(value) : null))
  .required('Campo requerido')

export default yup.object().shape({
  name: stringSchema,
  lastName: stringSchema,
  email: stringSchema.email('Correo electrónico inválido'),
  phone: stringSchema,
  isAdmin: yup.boolean().default(false),
  grade: numberSchema.min(1).max(10),
  schoolId: yup.string().trim().required('Campo requerido'),
})
