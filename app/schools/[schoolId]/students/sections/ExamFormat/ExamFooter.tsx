import { Stack, Box, Typography } from '@mui/material'

export default function ExamFooter() {
  return (
    <Stack gap={2}>
      <Stack
        width={'100%'}
        gap={1}
      >
        <Typography
          variant="subtitle1"
          fontWeight={'bold'}
          fontSize="14px"
        >
          Observaciones
        </Typography>
        <Box
          width={'100%'}
          height={'100px'}
          sx={{ border: '1px solid lightgray' }}
        />
      </Stack>
      <Stack
        direction={'row'}
        gap={2}
        justifyContent={'space-between'}
      >
        <Typography
          variant="subtitle1"
          fontWeight={'bold'}
          fontSize="14px"
        >
          Resultado
        </Typography>
        {['Aprobado', 'Reprobado'].map((label, index) => (
          <Stack
            key={index}
            direction={'row'}
            alignItems={'center'}
            gap={2}
          >
            <Box
              width={'40px'}
              height={'40px'}
              sx={{ border: '1px solid lightgray' }}
            />
            <Typography
              variant="subtitle1"
              fontSize="14px"
              fontWeight={'bold'}
            >
              {label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
