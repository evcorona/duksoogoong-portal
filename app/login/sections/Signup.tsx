"use client";

import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

export default function Signup() {
  const { push } = useRouter();
  const pathname = usePathname();

  const cards = [
    {
      title: "Tutor",
      subtitle:
        "Registra a tus hijos y accede fácilmente a su información escolar.",
      onClick: () => push(`${pathname}/tutor`),
    },
    {
      title: "Profesor",
      subtitle:
        "Gestiona y administra tu escuela de Taekwondo de manera eficiente.",
      onClick: () => push(`${pathname}/teacher`),
    },
    {
      title: "Alumno",
      subtitle:
        "Inscríbete en una escuela y sigue tu progreso académico. Solo para mayores de edad.",
      onClick: () => push(`${pathname}/adult`),
    },
  ];
  return (
    <>
      <Typography>Registrarse como:</Typography>
      <Stack
        gap={2}
        direction={"row"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        {cards.map((card) => (
          <Card
            sx={{
              cursor: "pointer",
              padding: 2,
              width: 300,
              height: 200,
              ":hover": {
                background:
                  "linear-gradient(180deg, rgba(253,246,12,1) 0%, rgba(254,253,230,1) 100%)",
              },
            }}
            onClick={card.onClick}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.subtitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      <Typography variant="body2">
        ¿Ya estas registrado? <Link href="login">Inicia sesión</Link>
      </Typography>
    </>
  );
}
