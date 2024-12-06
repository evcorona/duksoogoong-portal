import FormContainer from '@/src/components/form/FormContainer'
import RHFTextField from '@/src/components/form/RHFTextField'
import TitleBar from '@/src/components/TitleBar'
import { Box, Link, Typography } from '@mui/material'
import useLogin from '@/src/hooks/useLogin'

export default function LoginForm() {
  const { isLoading, methods, loginSubmit } = useLogin()

  const { handleSubmit } = methods

  return (
    <Box sx={{ width: '100%' }}>
      <FormContainer
        methods={methods}
        submitAction={handleSubmit(loginSubmit)}
        buttonLabel={'Entrar'}
        isLoading={isLoading}
        disabled={isLoading}
        buttonFullWidth
      >
        <TitleBar
          title="Iniciar sesión"
          isSectionTitle
        />
        <RHFTextField
          name="email"
          label="Email"
        />
        <RHFTextField
          name="password"
          label="Contraseña"
          type="password"
        />
      </FormContainer>
      <Typography
        variant="body2"
        marginTop={2}
        textAlign={'center'}
      >
        ¿Eres nuevo? <Link href="registro">Crea una cuenta</Link>
      </Typography>
    </Box>
  )
}
