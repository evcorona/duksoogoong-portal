"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import StudentForm from "sections/forms/StudentForm";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="sm"
        sx={{
          paddingY: { xs: 2, sm: 4 },
        }}
      >
        <StudentForm />
      </Container>
    </LocalizationProvider>
  );
}
