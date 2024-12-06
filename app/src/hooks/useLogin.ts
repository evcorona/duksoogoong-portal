import { useForm } from 'react-hook-form'
import { ICredentials } from '@/src/types/Users'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { errorHandler, loginService } from '@/src/services/auth'
import schema from '@/login/constants/login.schema'
import { useDispatch } from 'react-redux'
import { setUserState } from '@/src/store/userSlice'
import { useRouter } from 'next/navigation'

export default function useLogin() {
  const { push } = useRouter()
  const dispatch = useDispatch()

  const { mutate, isPending } = useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      dispatch(setUserState())
      push('/')
    },
    onError: (error) => errorHandler(error),
  })

  const methods = useForm<any>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  })

  const {
    formState: { isSubmitting, isLoading, isValidating },
  } = methods

  const loginSubmit = (formValues: ICredentials) => mutate(formValues)

  return {
    isLoading: [isSubmitting, isLoading, isValidating, isPending].some(Boolean),
    methods,
    loginSubmit,
  }
}
