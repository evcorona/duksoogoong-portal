"use client";

import TitleBar from "@/src/components/TitleBar";
import TeacherForm from "@/schools/[schoolId]/teachers/sections/TeacherForm";
import { Container } from "@mui/material";

export default function EditTeacher() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Editar profesor" />
      <TeacherForm />
    </Container>
  );
}
