'use client'

import { TableCell, TableRow, Typography } from '@mui/material'

import { Stack } from '@mui/material'
import { SearchOff } from '@mui/icons-material'

type Props = {
  title: string
  description: string
}

export default function EmptyContent(props: Props) {
  console.log('EmptyContent props:', props)

  return (
    <TableRow>
      <TableCell
        align="center"
        colSpan={100}
        sx={{ padding: 4, paddingBottom: 4 }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <SearchOff sx={{ fontSize: '100px', color: 'gray' }} />
          <Typography fontSize={'large'}>No hay registros</Typography>
          <Typography maxWidth={'xs'}>
            Aún no se han creado registros.
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  )
}
