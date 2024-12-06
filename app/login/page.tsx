"use client";

import { Container, Grow, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LoginForm from "./sections/LoginForm";

export default function Login() {
  return (
    <Grow in={true} timeout={1000}>
      <Container maxWidth="sm" sx={{ paddingY: { xs: 2, sm: 4 } }}>
        <Stack
          direction="column"
          width="100%"
          justifyContent="center"
          alignItems="center"
          gap={4}
        >
          <Image src={"/logo.png"} alt={"Logo"} width={130} height={130} />
          <Stack
            direction="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Typography variant="h5" textAlign={"center"}>
              Plataforma de DukSooGoong
            </Typography>
            <LoginForm />
          </Stack>
        </Stack>
      </Container>
    </Grow>
  );
}
