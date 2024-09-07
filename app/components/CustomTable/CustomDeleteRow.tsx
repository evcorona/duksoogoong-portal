/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import CustomDialog from "components/CustomDialog";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  data: any;
  deleteAction: (data: any) => void;
  getItemName: (data: any) => string;
  item: string;
};

export default function CustomDeleteRow(props: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <DeleteOutline
        onClick={() => setOpenDialog(true)}
        sx={{
          color: "red",
        }}
      />
      <CustomDialog
        open={openDialog}
        setOpen={setOpenDialog}
        item={props.item}
        itemName={props.getItemName(props.data)}
        isLoading={false}
        type="delete"
        onClick={() => {
          props.deleteAction(props.data);
          setOpenDialog(false);
        }}
      />
    </>
  );
}
