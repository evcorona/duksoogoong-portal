/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, Grid2 as Grid, Stack, SxProps } from "@mui/material";
import { FormProvider, UseFormReturn } from "react-hook-form";

import LoadingButton from "@mui/lab/LoadingButton";
import { ReactNode } from "react";
import { isArray } from "lodash";
import { useTranslation } from "next-i18next";

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  isLoading?: boolean;
  submitAction: (data: any) => void;
  buttonLabel?: string;
  buttonVariant?: "text" | "outlined";
  autoCompleteOff?: boolean;
  extraFooterComponents?: ReactNode;
  splitToColumns?: boolean;
  sx?: SxProps;
  clickAction?: () => void;
  buttonFullWidth?: boolean;
  disabled?: boolean;
};

export default function FormContainer(props: Props) {
  const { t } = useTranslation();

  const childrenArray: ReactNode[] =
    props.splitToColumns && isArray(props.children)
      ? props.children
      : [props.children];

  const columnsNumber = 12 / childrenArray.length;
  const autoComplete = props.autoCompleteOff ? "off" : "on";

  const hideFooter = !props.submitAction && !props.extraFooterComponents;
  const buttonWidth = props.buttonFullWidth ? "100%" : "auto";

  const { handleSubmit } = props.methods;

  return (
    <FormProvider {...props.methods}>
      <form
        onSubmit={handleSubmit(props.submitAction)}
        autoComplete={autoComplete}
      >
        <Card
          sx={{
            padding: { xs: 2, sm: 4 },
            paddingY: { xs: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 1,
            ...props.sx,
          }}
        >
          <Grid
            container
            spacing={4}
            direction={{ xs: "column-reverse", md: "row" }}
          >
            {childrenArray.map((child, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: columnsNumber }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                }}
              >
                {child}
                {!index && !hideFooter && (
                  <Stack
                    width="100%"
                    marginTop={2}
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent={
                      props.extraFooterComponents ? "space-between" : "flex-end"
                    }
                    gap={4}
                  >
                    {props.extraFooterComponents}

                    <LoadingButton
                      loading={props.isLoading}
                      type="submit"
                      variant={props.buttonVariant || "contained"}
                      disabled={props.disabled}
                      sx={{ width: { xs: "100%", sm: buttonWidth } }}
                    >
                      {t(props.buttonLabel ?? "")}
                    </LoadingButton>
                  </Stack>
                )}
              </Grid>
            ))}
          </Grid>
        </Card>
      </form>
    </FormProvider>
  );
}
