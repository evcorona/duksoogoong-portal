/* eslint-disable  @typescript-eslint/no-explicit-any */

'use client'

import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material'

import { ITableData } from '@/src/types/table/TableData'
import { useTranslation } from 'next-i18next'
import { Edit } from '@mui/icons-material'

type Props = {
  size?: 'small' | 'medium'
  headers: ITableData[]
  isAllChecked?: boolean
  handleAllChecked?: (isChecked: boolean) => void
  isMenuHeader?: boolean
}

export default function TableHeader(props: Props) {
  const { t } = useTranslation()

  function onChange(event: any) {
    props.handleAllChecked && props.handleAllChecked(event.target.checked)
  }

  return (
    <TableHead
      sx={{
        '.MuiTableCell-root': {
          color: 'white',
          backgroundColor: '#786F52',
          border: 'none',
        },
      }}
    >
      <TableRow
        sx={{
          fontWeight: 'bold',
        }}
      >
        {props.handleAllChecked && (
          <TableCell align="center">
            <Checkbox
              checked={!!props.isAllChecked}
              sx={{ color: '#A4A4A4' }}
              onChange={onChange}
            />
          </TableCell>
        )}
        {props.headers.map((header, i) => (
          <TableCell
            key={`tableHeader-${i}`}
            align={header.align ?? 'left'}
            sx={{
              fontSize: props.size,
              fontWeight: 'bold',
            }}
          >
            {t(header.label ?? '')}
          </TableCell>
        ))}
        {props.isMenuHeader && (
          <TableCell
            align="center"
            sx={{
              width: '50px',
              fontWeight: 'bold',
            }}
          >
            <Edit fontSize="small" />
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}
