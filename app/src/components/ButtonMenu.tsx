import { cloneElement, Fragment, ReactElement, useId, useState } from "react";
import { Button, Menu, MenuItem, SxProps } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTranslation } from "next-i18next";

interface IButtonBase {
  label: string;
  icon?: ReactElement;
  loading?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  variant?: "text" | "outlined" | "contained";
}

export interface IButton extends IButtonBase {
  onClick: () => void;
}

export interface IButtonMenu extends IButtonBase {
  items: IButton[];
}

export default function ButtonMenu(props: IButtonMenu) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = useId();
  const buttonMenuId = `button-menu-${id}`;
  const menuId = `menu-${id}`;

  return (
    <Fragment>
      <Button
        id={buttonMenuId}
        variant="contained"
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={props.icon}
        endIcon={<KeyboardArrowDown />}
        disableElevation
      >
        {t(props.label)}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": buttonMenuId,
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          marginTop: 1,
        }}
      >
        {props.items.map((item, index) => (
          <MenuItem
            key={`menu-${item.label}-${index}`}
            onClick={item.onClick}
            sx={{ whiteSpace: "nowrap", gap: 1, fontSize: "small" }}
          >
            {item.icon && cloneElement(item.icon)}
            {t(item.label)}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}
