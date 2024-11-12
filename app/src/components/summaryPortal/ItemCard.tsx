import { Card, Grid2 as Grid, SxProps, Typography } from "@mui/material";
import { isNaN } from "lodash";
import { useTranslation } from "next-i18next";
import Image from "next/image";

type Props = {
  title: string;
  value?: number;
  icon?: any;
  iconAsset?: string;
  onClick: () => void;
  sx?: SxProps;
};

export default function ItemCard(props: Props) {
  const { t } = useTranslation();

  const isValueNumber = !isNaN(props.value);

  return (
    <Card
      sx={{
        padding: 2,
        cursor: "pointer",
        border: "1px solid white",
        "&:hover": {
          border: "1px solid lightGray",
        },
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      <Grid container alignItems="stretch">
        <Grid
          size={{ xs: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 500,
              color: "#7E92A2",
              textAlign: "center",
            }}
          >
            {t(props.title)}
          </Typography>
          {isValueNumber && (
            <Typography
              sx={{
                fontSize: 44,
                fontWeight: 500,
                color: "#526477",
                textAlign: "center",
              }}
            >
              {props.value}
            </Typography>
          )}
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.icon && <props.icon sx={{ fontSize: 75 }} />}
          {props.iconAsset && (
            <Image
              src={props.iconAsset}
              alt={props.title}
              width={75}
              height={75}
            />
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
