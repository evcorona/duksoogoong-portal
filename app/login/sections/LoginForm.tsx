import FormContainer from "@/src/components/form/FormContainer";
import RHFTextField from "@/src/components/form/RHFTextField";
import TitleBar from "@/src/components/TitleBar";
import { Box, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import schema from "@/login/constants/login.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "@/src/services/auth";
import { useMutation } from "@tanstack/react-query";
import { ICredentials } from "@/src/types/Users";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/auth";

export default function LoginForm() {
  const { redirectionAfterLogin } = useContext(AuthContext);

  const { mutate: loginSubmit } = useMutation({
    mutationFn: login,
    onSuccess: () => redirectionAfterLogin(),
  });

  const methods = useForm<any>({
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isLoading, isValidating },
  } = methods;

  const submitAction = (formValues: ICredentials) => loginSubmit(formValues);

  return (
    <Box sx={{ width: "100%" }}>
      <FormContainer
        methods={methods}
        submitAction={handleSubmit(submitAction)}
        buttonLabel={"Entrar"}
        isLoading={isSubmitting || isLoading}
        disabled={isValidating || isSubmitting}
        buttonFullWidth
      >
        <TitleBar title="Iniciar sesión" isSectionTitle />
        <RHFTextField name="email" label="Email" />
        <RHFTextField name="password" label="Contraseña" type="password" />
      </FormContainer>
      <Typography variant="body2" marginTop={2} textAlign={"center"}>
        ¿Eres nuevo? <Link href="registro">Crea una cuenta</Link>
      </Typography>
    </Box>
  );
}
