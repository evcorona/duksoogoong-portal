"use client";

import CustomTable from "@/src/components/CustomTable/CustomTable";
import TitleBar from "@/src/components/TitleBar";
import { TUTORS_HEADERS } from "@/schools/[schoolId]/tutors/constants/tutor.headers";
import { getTutorsBySchoolId, deleteTutor } from "@/src/services/tutors";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, usePathname, useParams } from "next/navigation";
import SeeDetailButton from "@/src/components/CustomTable/SeeDetailButton";

export default function Tutors() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { schoolId } = useParams<{ schoolId: string }>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["schoolTutors", schoolId],
    queryFn: () => getTutorsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  });

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteTutor,
    onSuccess: () => refetch(),
  });

  return (
    <Container maxWidth="md" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar
        title="Tutores"
        buttonProps={{
          label: "crear tutor",
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        size="small"
        name="tutors"
        headers={TUTORS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
        rowComponentProps={{
          actions: {
            href: (row: any) => `${pathname}/${row?._id}`,
            openInNewTab: true,
          },
          component: SeeDetailButton,
        }}
      />
    </Container>
  );
}
