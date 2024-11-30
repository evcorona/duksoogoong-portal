"use client";

import TitleBar from "@/src/components/TitleBar";
import { getStudentsBySchoolId } from "@/src/services/students";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import StudentTable from "./sections/StudentTable";

export default function Students() {
  const { schoolId } = useParams<{ schoolId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["schoolStudents", schoolId],
    queryFn: () => getStudentsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  });
  return (
    <Container maxWidth="md" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Estudiantes" />
      <StudentTable data={data} isLoading={isLoading} />
    </Container>
  );
}
