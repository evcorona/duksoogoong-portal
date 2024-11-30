"use client";

import { Box, Stack } from "@mui/material";

import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/background2.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
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
    </Box>
  );
}
