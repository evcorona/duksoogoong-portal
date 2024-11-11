"use client";

import { TableCell, Skeleton, TableRow } from "@mui/material";

type Props = {
  rowsNumber: number;
  cellsNumber: number;
};

export default function TableSkeleton(props: Props) {
  const rows = Array(props.rowsNumber).fill(0);
  const cells = Array(props.cellsNumber).fill(0);

  return (
    <>
      {rows.map((_, row) => (
        <TableRow key={`skeleton-row-${row}`}>
          {cells.map((_, cell) => (
            <TableCell key={cell} padding="normal">
              <Skeleton variant="text" width="100%" height="100%" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
