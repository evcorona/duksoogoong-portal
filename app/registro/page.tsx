'use client'

import { Stack, Typography } from '@mui/material'
import Image from 'next/image'
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
        <Image
          src={'/logo.png'}
          alt={'Logo'}
          width={130}
          height={130}
        />
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
