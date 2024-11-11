"use client";

import { Box, FormHelperText } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { useTranslation } from "next-i18next";

type Props = {
  name: string;
  label?: string;
  maxDate?: Dayjs;
  minDate?: Dayjs;
};

type Error = {
  key: string;
  options: object;
};

export default function RHFDatePicker({ name, ...props }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const errorMessage = error?.message as string | Error;
        const isErrorComposed = typeof errorMessage === "object";

        return (
          <Box>
            <DatePicker
              {...field}
              {...props}
              label={t(props.label ?? "")}
              sx={{ width: "100%" }}
            />
            <FormHelperText error={!!error} sx={{ whiteSpace: "nowrap" }}>
              {isErrorComposed ? t(errorMessage?.key) : t(errorMessage ?? " ")}
            </FormHelperText>
          </Box>
        );
      }}
    />
  );
}
