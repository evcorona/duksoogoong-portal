import { Container, Grow } from "@mui/material";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <Grow in={true} timeout={1000}>
      <Container sx={{ paddingY: { xs: 2, sm: 4 } }}>{children}</Container>
    </Grow>
  );
}
