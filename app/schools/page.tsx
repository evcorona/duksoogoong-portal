"use client";

import CustomTable from "@/src/components/CustomTable/CustomTable";
import TitleBar from "@/src/components/TitleBar";
import { SCHOOLS_HEADERS } from "@/schools/constants/schools.headers";
import { getSchools, deleteSchool } from "@/src/services/schools";
import { Add } from "@mui/icons-material";
import { Container } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ISchool } from "@/src/types/School";

export default function Schools() {
  const [selectedRow, setSelectedRow] = useState<ISchool | null>(null);

  const { push } = useRouter();
  const pathname = usePathname();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allSchools"],
    queryFn: getSchools,
  });

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteSchool,
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    selectedRow && push(`${pathname}/${selectedRow?._id}`);
  }, [selectedRow]);

  return (
    <Container maxWidth="xl" sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar
        title="Escuelas"
        buttonProps={{
          label: "crear escuela",
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        size="small"
        name="schools"
        headers={SCHOOLS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
        selectRowProps={{
          skipFirstSelection: true,
          selectedRow,
          setSelectedRow,
        }}
      />
    </Container>
  );
}
