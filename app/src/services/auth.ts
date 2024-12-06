import api from 'src/services/index'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import { ICredentials } from '@/src/types/Users'

const errors = {
  invalidData: {
    status: 401,
    message: 'Email o contraseña incorrectos',
  },
  network: {
    message: 'Error de red, intenta de nuevo',
  },
  unknown: {
    message: 'Error desconocido',
  },
}

export const loginService = async (data: ICredentials) => {
  const response = await api.post('/auth/login', data)

  const token = get(response, 'data.data.token', null)

  sessionStorage.setItem('DSG', token)

  return
}

export const errorHandler = (error: any) => {
  if (!error.response) {
    return toast.error(errors.network.message)
  }

  switch (error.response?.status) {
    case errors.invalidData.status:
      toast.error(errors.invalidData.message)
      break

    default:
      toast.error(errors.unknown.message)
      break
  }
}
