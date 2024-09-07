"use client";

import { ReactElement } from "react";
import { Button, SxProps } from "@mui/material";
import { useTranslation } from "next-i18next";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (data: any) => void;
  icon: ReactElement;
  label: string;
  sx: SxProps;
};

export default function CustomRowButton(props: Props) {
  const { t } = useTranslation();

  return (
    <Button
      variant="text"
      sx={{
        whiteSpace: "nowrap",
        ...props.sx,
      }}
      startIcon={props.icon}
      onClick={() => props.action(props.data)}
    >
      {t(props.label)}
    </Button>
  );
}
