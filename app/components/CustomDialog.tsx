"use client";

import { DeleteOutline, InfoOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";

type Action = "delete" | "confirmation" | "accepted";

type Props = {
  open: boolean;
  item: string;
  itemName?: string;
  setOpen: (open: boolean) => void;
  onClick: () => void;
  onClickSecondaryButton?: () => void;
  isLoading: boolean;
  type: Action;
  translateOptions?: any;
  children?: React.ReactNode;
};

export default function CustomDialog(props: Props) {
  const { t } = useTranslation();
  let actionText = "delete_confirmation";
  let buttonText = "yes_delete";
  let buttonColor = "#E11900";
  let secondaryButtonText = "cancel";
  switch (props.type) {
    case "confirmation":
      actionText = "confirmation";
      buttonText = "yes";
      buttonColor = "#141414";
      break;
    case "accepted":
      actionText = "accepted";
      buttonText = "yes_accept";
      buttonColor = "#141414";
      secondaryButtonText = "no_reject";
      break;
  }

  const isDelete = props.type === "delete";
  const isConfirmation =
    props.type === "confirmation" || props.type === "accepted";

  const handleClickSecondaryButton = () => {
    if (props.onClickSecondaryButton) props.onClickSecondaryButton();
    props.setOpen(false);
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        {isDelete && <DeleteOutline fontSize="large" />}
        {isConfirmation && <InfoOutlined fontSize="large" />}
        <Typography fontWeight="bold" fontSize="large">
          {t(`${actionText}.${props.item}.title`)}
        </Typography>
      </DialogTitle>
      <IconButton
        onClick={() => props.setOpen(false)}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {props.itemName && (
          <Typography fontWeight="bold" fontSize="large" marginBottom={1}>
            {props.itemName}
          </Typography>
        )}
        <Typography>
          {t(`${actionText}.${props.item}.description`, {
            translateOptions: props.translateOptions,
          })}
        </Typography>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={props.isLoading}
          onClick={props.onClick}
          variant="contained"
          sx={{ backgroundColor: buttonColor }}
        >
          {t(buttonText)}
        </LoadingButton>
        <Button
          variant="outlined"
          autoFocus
          onClick={() => handleClickSecondaryButton()}
          sx={{
            color: "black",
            borderColor: "black",
          }}
        >
          {t(secondaryButtonText)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
