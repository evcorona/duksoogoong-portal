"use client";

import TitleBar from "@/src/components/TitleBar";
import SchoolForm from "@/schools/sections/SchoolForm";
import { Container } from "@mui/material";

export default function CreateSchool() {
  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Crear escuela" />
      <SchoolForm />
    </Container>
  );
}
