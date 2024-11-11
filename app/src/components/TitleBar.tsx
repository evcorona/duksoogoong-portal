"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, Typography, SxProps, Divider, Box } from "@mui/material";
import ButtonMenu, { IButton, IButtonMenu } from "src/components/ButtonMenu";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

export type TitleBarProps = {
  title: string;
  buttonProps?: IButton;
  multipleButtonProps?: IButtonMenu;
  sx?: SxProps;
  isSectionTitle?: boolean;
  fontSize?: string | number;
  extraContent?: ReactNode;
  sxContainer?: SxProps;
};

export default function TitleBar(props: TitleBarProps) {
  const { t } = useTranslation();

  const marginBottom = props.isSectionTitle ? 2 : 3;
  const fontSize = props.isSectionTitle ? "medium" : 24;

  return (
    <Box marginBottom={marginBottom} sx={props.sxContainer}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        sx={props.sx}
      >
        <Typography fontSize={props.fontSize || fontSize} fontWeight={700}>
          {t(props.title)}
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          alignItems="center"
          sx={props.sx}
        >
          {props.buttonProps && (
            <LoadingButton
              loadingPosition="start"
              loading={props.buttonProps.loading}
              variant={props.buttonProps.variant ?? "contained"}
              onClick={props.buttonProps.onClick}
              startIcon={props.buttonProps.icon}
              disabled={props.buttonProps.disabled}
              sx={{
                whiteSpace: "nowrap",
                ...props.buttonProps.sx,
              }}
            >
              {t(props.buttonProps?.label)}
            </LoadingButton>
          )}
          {props.multipleButtonProps && (
            <ButtonMenu {...props.multipleButtonProps} />
          )}
          {props?.extraContent}
        </Stack>
      </Stack>
      {props.isSectionTitle && <Divider sx={{ marginTop: 1 }} />}
    </Box>
  );
}
