import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().trim().email().required('Campo requerido'),
  password: yup.string().trim().required('Campo requerido'),
})
