import * as yup from 'yup'

const stringSchema = yup.string().trim().required('Campo requerido')

export default yup.object().shape({
  name: stringSchema.lowercase(),
  lastName: stringSchema.lowercase(),
  email: stringSchema.email('Correo electrónico inválido'),
  phone: stringSchema,
  address: yup.object().shape({
    address: stringSchema.lowercase(),
    state: stringSchema.lowercase(),
    city: stringSchema.lowercase(),
    zipCode: stringSchema,
  }),
  isActive: yup.boolean().default(true),
  students: yup.array().of(yup.string()),
  userId: yup.string(),
})
