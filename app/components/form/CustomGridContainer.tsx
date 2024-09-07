import { Grid2 as Grid, SxProps } from "@mui/material";

import { ReactNode } from "react";
import { isArray } from "lodash";

type ResponsiveValues = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

type Props = {
  children: ReactNode[];
  itemSize?: ResponsiveValues | ResponsiveValues[];
  columnSpacing?: ResponsiveValues;
  rowSpacing?: ResponsiveValues;
  sx?: SxProps;
};

export default function CustomGridContainer(props: Props) {
  return (
    <Grid
      container
      columnSpacing={props.columnSpacing}
      rowSpacing={props.rowSpacing}
      sx={props.sx}
    >
      {props.children.map((component, index) => {
        const itemSize = isArray(props.itemSize)
          ? props.itemSize[index]
          : props.itemSize;

        return (
          <Grid key={index} size={itemSize}>
            {component}
          </Grid>
        );
      })}
    </Grid>
  );
}
