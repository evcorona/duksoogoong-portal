"use client";

import StudentTable from "@/schools/[schoolId]/students/sections/StudentTable";
import Page from "@/src/components/Page";
import TitleBar from "@/src/components/TitleBar";
import { getStudentsByTutorId } from "@/src/services/students";
import { Add } from "@mui/icons-material";
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
    <Page>
      <TitleBar
        title="Registro de Estudiante"
        buttonProps={{
          label: "Agregar estudiante",
          icon: <Add />,
          onClick: () => push(`${pathname}/student`),
        }}
      />
      <StudentTable data={data} isLoading={isLoading} />
    </Page>
  );
}
