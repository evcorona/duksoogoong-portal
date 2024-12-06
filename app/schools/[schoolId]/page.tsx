"use client";

import SummaryPortal from "@/src/components/summaryPortal";
import TitleBar from "@/src/components/TitleBar";
import { getSchoolById } from "@/src/services/schools";
import { getStudentsBySchoolId } from "@/src/services/students";
import { getTeachersBySchoolId } from "@/src/services/teachers";
import { getTutorsBySchoolId } from "@/src/services/tutors";
import { Face, FamilyRestroom, Groups } from "@mui/icons-material";
import Page from "@/src/components/Page";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function School() {
  const { schoolId } = useParams<{ schoolId: string }>();
  const { push } = useRouter();
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: () => getSchoolById(schoolId as string),
    enabled: !!schoolId,
  });

  const { data: teachers } = useQuery({
    queryKey: ["schoolTeachers", schoolId],
    queryFn: () => getTeachersBySchoolId(schoolId as string),
    enabled: !!schoolId,
  });

  const { data: students } = useQuery({
    queryKey: ["schoolStudents", schoolId],
    queryFn: () => getStudentsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  });

  const { data: tutors } = useQuery({
    queryKey: ["schoolTutors", schoolId],
    queryFn: () => getTutorsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  });

  return (
    <Page>
      <TitleBar title="Escuela" />
      <SummaryPortal
        titleData={{
          title: data?.name || "",
          subtitle: "",
          extraData: [
            data?.address?.address || "",
            data?.address?.city || "",
            data?.address?.state || "",
            data?.address?.zipCode || "",
          ],
        }}
        portalContent={[
          {
            content: [
              {
                title: "Profesores",
                value: teachers?.length || 0,
                icon: Groups,
                onClick: () => push(`${pathname}/teachers`),
                isDisabled: false,
              },
              {
                title: "Estudiantes",
                value: students?.length || 0,
                icon: Face,
                onClick: () => push(`${pathname}/students`),
                isDisabled: false,
              },
              {
                title: "Tutores",
                value: tutors?.length || 0,
                icon: FamilyRestroom,
                onClick: () => push(`${pathname}/tutors`),
                isDisabled: false,
              },
            ],
          },
        ]}
      />
    </Page>
  );
}
