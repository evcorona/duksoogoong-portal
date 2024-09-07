import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

interface ButtonProps {
  onClick: () => void;
  isLoading: boolean;
  buttonText?: string;
}

export interface CheckboxButtonProps extends ButtonProps {
  hide: boolean;
  defaultText: string;
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
}

export interface CheckboxFeature {
  isAllChecked: boolean;
  rowsChecked: unknown[];
  setRowsChecked: (rows: any, checked: boolean) => void;
  handleAllChecked?: (isChecked: boolean) => void;
  deleteProps?: ButtonProps;
  editProps?: ButtonProps;
  exportProps?: ButtonProps;
}
