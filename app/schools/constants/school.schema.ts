import * as yup from 'yup'

const stringSchema = yup.string().trim().lowercase().required('Campo requerido')

export default yup.object().shape({
  name: stringSchema,
  isActive: yup.boolean().default(true),
  address: yup.object().shape({
    address: stringSchema,
    state: stringSchema,
    city: stringSchema,
    zipCode: stringSchema,
  }),
})
