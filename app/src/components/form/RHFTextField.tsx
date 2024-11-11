"use client";

import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import MaskedInput from "./MaskInput";

type Props = {
  name: string;
  label?: string;
  icon?: ReactNode;
  endIconPosition?: boolean;
  maskoptions?: any;
  capitalize?: boolean;
} & TextFieldProps;

type Error = {
  key: string;
  options: object;
};

export default function RHFTextField({ name, capitalize, ...props }: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const errorMessage = error?.message as string | Error;
        const isErrorComposed = typeof errorMessage === "object";

        const adornmentPosition = props?.endIconPosition ? "end" : "start";
        const adornment = props?.icon
          ? {
              [`${adornmentPosition}Adornment`]: (
                <InputAdornment position={adornmentPosition}>
                  {props?.icon}
                </InputAdornment>
              ),
            }
          : undefined;

        return (
          <Box>
            <TextField
              {...field}
              {...props}
              onChange={field.onChange}
              size="small"
              fullWidth
              label={t(props.label ?? "")}
              placeholder={t(props.placeholder ?? "")}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  ...adornment,
                  inputComponent: props.maskoptions
                    ? (MaskedInput as any)
                    : undefined,
                  inputProps: { maskoptions: props.maskoptions || {} },
                },
              }}
              error={!!error}
              value={field.value}
              sx={{
                ".MuiInputBase-input": {
                  textTransform: capitalize ? "capitalize" : "none",
                },
              }}
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
