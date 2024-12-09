import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function Header() {
  return (
    <Stack
      gap={1}
      direction={'row'}
      justifyContent="space-between"
      alignItems="center"
    >
      <Image
        src={'/logo.png'}
        alt={'Logo'}
        width={110}
        height={110}
        priority
      />
      <Stack
        gap={1}
        direction={'column'}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="subtitle1"
          fontSize="16px"
        >
          Asociación Duk Soo Goong
        </Typography>
        <Typography
          variant="subtitle1"
          fontSize="16px"
        >
          TaeKwonDo y HapKiDo, A.C.
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize="20px"
          sx={{ whiteSpace: 'nowrap' }}
        >
          YU KUP YA SHIMSA
        </Typography>
      </Stack>
      <Box
        sx={{
          border: '1px solid lightgray',
          height: '110px',
          width: '150px',
          padding: 1,
          fontSize: '10px',
          textAlign: 'center',
        }}
      >
        Numeración
      </Box>
    </Stack>
  )
}
