/* eslint-disable  @typescript-eslint/no-explicit-any */

'use client'

import { Button } from '@mui/material'
import Link from 'next/link'

type Props = {
  data: any
  href: (row: any) => string
  openInNewTab?: boolean
}

export default function SeeDetailButton(props: Props) {
  return (
    <Link
      href={props.href(props.data)}
      target={props?.openInNewTab ? '_blank' : undefined}
    >
      <Button
        variant="text"
        sx={{ whiteSpace: 'nowrap' }}
      >
        {'Ver detalles'}
      </Button>
    </Link>
  )
}
