"use client";

import { Container } from "@mui/material";
import StudentForm from "@/src/sections/forms/StudentForm";

export default function Home() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        paddingY: { xs: 2, sm: 4 },
      }}
    >
      <StudentForm />
    </Container>
  );
}
