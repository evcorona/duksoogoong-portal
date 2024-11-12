import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormControlLabel, FormControlLabelProps } from "@mui/material";
import { useTranslation } from "next-i18next";

type IProps = Omit<FormControlLabelProps, "control">;

interface Props extends IProps {
  name: string;
  label: string;
  labelOptions?: object;
  disabled?: boolean;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  switchColor?: {
    status: boolean;
    checked: string;
    unchecked: string;
  };
  size?: "small" | "medium";
}

const coloringSwitch = (
  checked: boolean,
  colorChecked: string,
  colorUnchecked: string,
) => ({
  color: checked ? colorChecked : colorUnchecked,
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: colorChecked,
  },
  "& .MuiSwitch-switchBase": {
    color: colorUnchecked,
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: colorChecked,
    opacity: 0.3,
  },
  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
    backgroundColor: colorUnchecked,
    opacity: 0.3,
  },
});

export default function RHFSwitch({
  name,
  label,
  labelPlacement,
  disabled,
  switchColor,
  ...other
}: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  const switchColorStyles =
    switchColor &&
    coloringSwitch(
      switchColor.status,
      switchColor.checked,
      switchColor.unchecked,
    );

  return (
    <FormControlLabel
      {...other}
      label={t(label, { ...other.labelOptions })}
      labelPlacement={labelPlacement || "end"}
      sx={{
        marginLeft: 0,
        ".MuiFormControlLabel-label": {
          fontSize: other.size === "small" ? "12px" : "14px",
          textAlign: "left",
        },
        ...other.sx,
        ...switchColorStyles,
      }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              disabled={disabled}
              size={other.size}
            />
          )}
        />
      }
    />
  );
}
