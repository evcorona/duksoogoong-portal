import FormContainer from '@/src/components/form/FormContainer'
import RHFTextField from '@/src/components/form/RHFTextField'
import TitleBar from '@/src/components/TitleBar'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
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
      <Stack
        gap={2}
        sx={{
          paddingX: { xs: 2, sm: 4 },
          paddingTop: 2,
        }}
      >
        <Typography
          variant="body2"
          textAlign="center"
        >
          ¿Eres nuevo por aquí? Regístrate ahora para empezar, ya seas profesor,
          tutor o estudiante.
        </Typography>
        <Button
          variant="outlined"
          fullWidth
        >
          <Link href="registro">Crear cuenta</Link>
        </Button>
      </Stack>
    </Box>
  )
}
