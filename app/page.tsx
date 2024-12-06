"use client";

import { Box, Stack } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IPayload } from "@/src/store/userSlice";

export default function Home() {
  const authData = useSelector((state: { user: IPayload }) => state);

  const { push } = useRouter();

  useEffect(() => {
    const { role, userId, schoolId } = authData.user;

    if (role === "schoolAdmin") push(`/schools/${schoolId}`);
    if (role === "teacher") push(`/schools/${schoolId}/teachers/${userId}`);
    if (role === "tutor") push(`/tutors/${userId}`);
    if (role === "admin") push("/schools");
    if (role === "main") push("/schools");
  }, [authData]);

  return (
    <>
      <Stack justifyContent={"center"} alignItems={"center"} height={"90vh"}>
        <Box
          sx={{
            width: "50%",
            height: "50%",
            position: "relative",
          }}
        >
          <Image
            src={"/logo.png"}
            alt={"Logo"}
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Stack>
    </>
  );
}
