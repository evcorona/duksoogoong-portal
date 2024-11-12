"use client";

import SummaryPortal from "@/src/components/summaryPortal";
import TitleBar from "@/src/components/TitleBar";
import { getSchoolById } from "@/src/services/schools";
import { getTeachersBySchoolId } from "@/src/services/teachers";
import { Groups } from "@mui/icons-material";
import { Container } from "@mui/material";
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

  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
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
            ],
          },
        ]}
      />
    </Container>
  );
}
