import { Stack, SxProps, Typography } from '@mui/material'
import { Fragment } from 'react'
import CustomGridContainer from './CustomGridContainer'

type Props = {
  fields: { label: string; value: string | null }[][]
  sx?: SxProps
}

export default function CustomDataColumns(props: Props) {
  const columns = 12 / props.fields.length

  return (
    <CustomGridContainer
      itemSize={{ xs: columns }}
      columnSpacing={{ xs: 1 }}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        ...props.sx,
      }}
    >
      {props.fields.map((column, i) => (
        <Fragment key={i}>
          {column.map((field, j) => (
            <Stack
              key={j}
              gap={1}
              direction={'row'}
              sx={{ padding: 0.5 }}
            >
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                fontSize="14px"
                sx={{ width: '300px', whiteSpace: 'nowrap' }}
              >
                {field.label}
              </Typography>
              <Typography
                variant="subtitle1"
                fontSize="14px"
                sx={{
                  width: '100%',
                  textTransform: 'capitalize',
                  borderBottom: !field.value ? '1px solid black' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {field.value}
              </Typography>
            </Stack>
          ))}
        </Fragment>
      ))}
    </CustomGridContainer>
  )
}
