"use client";

import { TableCell, Skeleton } from "@mui/material";

type Props = {
  cellsNumber: number;
};

export default function RowSkeleton(props: Props) {
  const cells = Array(props.cellsNumber).fill(0);
  return (
    <>
      {cells.map((_, cell) => (
        <TableCell key={cell} padding="normal">
          <Skeleton variant="text" width="100%" height="100%" />
        </TableCell>
      ))}
    </>
  );
}
