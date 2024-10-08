/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";

import { HeaderType } from "constants/headers/headers.types";
import { useTranslation } from "next-i18next";

type Props = {
  size?: "small" | "medium";
  headers: HeaderType[];
  isAllChecked?: boolean;
  handleAllChecked?: (isChecked: boolean) => void;
};

export default function TableHeader(props: Props) {
  const { t } = useTranslation();

  function onChange(event: any) {
    props.handleAllChecked && props.handleAllChecked(event.target.checked);
  }

  return (
    <TableHead
      sx={{
        backgroundColor: "#F4F4F4",
        borderBottom: "1px solid #EAEEF4",
        borderRadius: "0px",
        color: "#000",
        fontWeight: "bold",
        borderBottomLeftRadius: "0px",
      }}
    >
      <TableRow
        sx={{
          backgroundColor: "#F4F4F4",
          borderBottom: "1px solid #EAEEF4",
          borderRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        {props.handleAllChecked && (
          <TableCell
            align="center"
            sx={{
              borderBottom: "1px solid #EAEEF4",
              backgroundColor: "#F4F4F4",
              borderBottomLeftRadius: "0px",
            }}
          >
            <Checkbox
              checked={!!props.isAllChecked}
              sx={{ color: "#A4A4A4" }}
              onChange={onChange}
            />
          </TableCell>
        )}
        {props.headers.map((header, i) => (
          <TableCell
            key={`tableHeader-${i}`}
            align={header.align ?? "left"}
            sx={{
              backgroundColor: "#F4F4F4",
              fontSize: props.size,
              borderBottom: "1px solid #EAEEF4",
              color: "#000",
              borderBottomLeftRadius: "0px",
            }}
          >
            {t(header.label ?? "")}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
