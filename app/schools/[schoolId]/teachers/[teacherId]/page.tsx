"use client";

import CustomCard from "@/src/components/CustomCard";
import TitleBar from "@/src/components/TitleBar";
import { getTeacherById } from "@/src/services/teachers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { TEACHERS_HEADERS } from "@/schools/[schoolId]/teachers/constants/teacher.headers";
import { getStudentsByTeacherId } from "@/src/services/students";
import StudentTable from "@/schools/[schoolId]/students/sections/StudentTable";

export default function TeacherStudents() {
  const { teacherId } = useParams<{
    teacherId: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: ["teacher", teacherId],
    queryFn: () => getTeacherById(teacherId as string),
    enabled: !!teacherId,
  });

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ["students", teacherId],
    queryFn: () => getStudentsByTeacherId(teacherId as string),
    enabled: !!teacherId,
  });

  return (
    <Container maxWidth="md" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title="Detalles del Profesor" />
      <CustomCard
        title="Detalles"
        data={[data]}
        headers={TEACHERS_HEADERS}
        isLoading={isLoading}
      />
      <TitleBar title="Estudiantes" sx={{ marginTop: 3 }} />
      <StudentTable data={students} isLoading={isLoadingStudents} />
    </Container>
  );
}
