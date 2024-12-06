"use client";

import StudentForm2 from "@/schools/[schoolId]/students/sections/StudentForm2";
import TitleBar from "@/src/components/TitleBar";
import { Container } from "@mui/material";

export default function StudentJoin() {
  return (
    <Container maxWidth="md" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm2 />
    </Container>
  );
}
