'use client'

import { Card, CardContent, Link, Stack, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

export default function Signup() {
  const { push } = useRouter()
  const pathname = usePathname()

  const cards = [
    {
      title: 'Tutor',
      subtitle:
        'Registra a tus hijos, accede fácilmente a su información escolar y sigue su progreso académico',
      onClick: () => push(`${pathname}/tutor`),
    },
    {
      title: 'Profesor',
      subtitle: 'Gestiona tu escuela y/o estudiantes de manera eficiente',
      onClick: () => push(`${pathname}/teacher`),
    },
    {
      title: 'Estudiante',
      subtitle:
        'Regístrate en una escuela y sigue tu progreso académico. Solo para mayores de edad',
      onClick: () => push(`${pathname}/student`),
    },
  ]
  return (
    <>
      <Typography>Registrarse como:</Typography>
      <Stack
        gap={2}
        direction={'row'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            sx={{
              cursor: 'pointer',
              padding: 2,
              width: 300,
              height: 170,
              ':hover': {
                background:
                  'linear-gradient(180deg, rgba(253,246,12,1) 0%, rgba(254,253,230,1) 100%)',
              },
            }}
            onClick={card.onClick}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {card.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary' }}
              >
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
  )
}
