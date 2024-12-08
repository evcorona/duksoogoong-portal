'use client'

import { Stack, Typography } from '@mui/material'
import Signup from '@/login/sections/Signup'
import Page from '@/src/components/Page'

export default function Login() {
  return (
    <Page>
      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Stack
          direction="column"
          width="100vw"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            variant="h5"
            textAlign={'center'}
          >
            Plataforma de DukSooGoong
          </Typography>
          <Signup />
        </Stack>
      </Stack>
    </Page>
  )
}
