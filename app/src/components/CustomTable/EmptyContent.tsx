"use client";

import { TableCell, TableRow, Typography } from "@mui/material";

import Image from "next/image";
import { Stack } from "@mui/material";
import { useTranslation } from "next-i18next";

type Props = {
  title: string;
  description: string;
};

export default function EmptyContent(props: Props) {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={100}
        sx={{ padding: 4, paddingBottom: 4 }}
      >
        <Stack alignItems="center" justifyContent="center" gap={2}>
          <Image
            width={150}
            height={142}
            src="/assets/icons/filesleep.svg"
            alt="File Sleeping"
          />
          <Typography variant="h5">{t(props.title)}</Typography>
          <Typography maxWidth={670}>{t(props.description)}</Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
