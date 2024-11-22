"use client";

import StudentTable from "@/schools/[schoolId]/students/sections/StudentTable";
import TitleBar from "@/src/components/TitleBar";
import { getStudentsByTutorId } from "@/src/services/students";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function StudentJoin() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const { push } = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["tutorStudents", tutorId],
    queryFn: () => getStudentsByTutorId(tutorId as string),
    enabled: !!tutorId,
  });

  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar
        title="Registro de Estudiante"
        buttonProps={{
          label: "Agregar estudiante",
          icon: <Add />,
          onClick: () => push(`${pathname}/student`),
        }}
      />
      <StudentTable data={data} isLoading={isLoading} />
    </Container>
  );
}
