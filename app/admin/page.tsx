"use client";

import CustomTable from "@/components/CustomTable/CustomTable";
import { STUDENTS_HEADERS } from "@/constants/headers/students.headers";
import { getStudents } from "@/services/students";
import { Container, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Admin() {
  const { data, isLoading } = useQuery({
    queryKey: ["allStudents"],
    queryFn: getStudents,
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingY: { xs: 2, sm: 4 },
      }}
    >
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Image src={"/logo.png"} alt={"Logo"} width={130} height={130} />
      </Stack>
      <Typography align="center" variant="h4">
        Alumnos
      </Typography>
      <CustomTable
        size="small"
        name="students"
        headers={STUDENTS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        sx={{
          marginTop: 2,
          paddingBottom: 2,
        }}
      />
    </Container>
  );
}
