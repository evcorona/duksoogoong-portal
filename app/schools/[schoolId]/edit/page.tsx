"use client";

import TitleBar from "@/src/components/TitleBar";
import SchoolForm from "@/schools/sections/SchoolForm";
import { Container } from "@mui/material";

export default function EditSchool() {
  return (
    <Container maxWidth="md" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Editar escuela" />
      <SchoolForm />
    </Container>
  );
}
