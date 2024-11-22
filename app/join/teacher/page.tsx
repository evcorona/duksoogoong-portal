"use client";

import TeacherForm from "@/schools/[schoolId]/teachers/sections/TeacherForm";
import TitleBar from "@/src/components/TitleBar";
import { Container } from "@mui/material";

export default function TeacherJoin() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Registro de Profesor" />
      <TeacherForm />
    </Container>
  );
}
