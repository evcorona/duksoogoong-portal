/* eslint-disable  @typescript-eslint/no-explicit-any */
'use client'

import { Check, Close } from '@mui/icons-material'
import {
  Checkbox,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { isArray, isBoolean } from 'lodash'

import { CustomRowProps } from '@/src/types/table/Table'
import SvgIconStyle from 'src/components/SvgIconStyle'
import TableMenu from 'src/components/CustomTable/TableMenu'

import { useTranslation } from 'next-i18next'

export default function CustomRow(props: CustomRowProps) {
  const { t } = useTranslation()

  const { selectedRow, setSelectedRow } = props?.selectRowProps || {}

  const isSelected = selectedRow && selectedRow.id === props.data.id
  const isChecked = props.rowsChecked?.includes(
    props.data[props.idAccessor ?? 'id'],
  )

  const onClickRow = () => setSelectedRow && setSelectedRow(props.data)
  const onCheckRow = (event: any) =>
    props.setRowsChecked &&
    props.setRowsChecked(props.data, event.target.checked)

  return (
    <TableRow
      hover={true}
      selected={isSelected}
      sx={{
        cursor: props?.selectRowProps ? 'pointer' : 'default',
        ...props.customStyle,

        '.MuiTableCell-root': {
          cursor: props?.selectRowProps ? 'pointer' : 'default',
        },
      }}
    >
      {props.setRowsChecked && (
        <TableCell
          align="center"
          onClick={onClickRow}
          sx={{
            borderBottom: '1px solid #EAEEF4',
          }}
        >
          <Checkbox
            checked={!!isChecked}
            sx={{ color: '#A4A4A4' }}
            onChange={onCheckRow}
          />
        </TableCell>
      )}

      {props.customChildren && props.customChildren}
      {!props.customChildren &&
        props.headers.map((header, i) => {
          const displayIndex = header.accessor === 'index'
          const value = props.data[header.accessor]
          const customRow =
            header.customRow && header.customRow(value, props.data)
          const content = displayIndex
            ? props.index + 1
            : (customRow?.value ?? value)
          const icon = customRow?.icon

          const translationOptions = customRow?.translationOptions
          const contentLocalized = header.translate
            ? t(content, translationOptions)
            : content

          const isTotalsRow = props.hasTotals && i === props.headers.length - 1
          const contentIsBoolean = isBoolean(content)
          const contentIsArray = isArray(content)

          const booleanValue = () =>
            content ? (
              <Check sx={{ color: '#A4A4A4', ...customRow?.styles }} />
            ) : (
              <Close sx={{ color: '#A4A4A4', ...customRow?.styles }} />
            )

          const contentIsText = !contentIsBoolean && !contentIsArray

          const onClick = customRow?.onClick ?? onClickRow

          const isCursorPointer = customRow?.redirectTo || customRow?.onClick

          return (
            <TableCell
              key={`tableCell-${i}`}
              padding="normal"
              align={header.align ?? 'left'}
              sx={{
                borderBottom: '1px solid #EAEEF4',
                color: value ? 'text' : 'GrayText',
                cursor: isCursorPointer ? 'pointer' : 'default',
                ':hover': {
                  textDecoration: isCursorPointer ? 'underline' : 'none',
                  textUnderlineOffset: '4px',
                },
              }}
              onClick={onClick}
            >
              {contentIsArray && (
                <Stack
                  gap={1}
                  direction="row"
                  flexWrap="wrap"
                  sx={{ ...customRow?.styles }}
                >
                  {icon && (
                    <Tooltip
                      title="Routes Number"
                      placement="top-start"
                    >
                      <SvgIconStyle
                        src={`/assets/icons/${icon}.svg`}
                        sx={{ width: 20, height: 20 }}
                      />
                    </Tooltip>
                  )}

                  {content.map((item, index) => (
                    <Chip
                      key={index}
                      label={item}
                    />
                  ))}
                </Stack>
              )}
              {contentIsBoolean && booleanValue()}
              {contentIsText && (
                <Typography
                  fontSize={props.size}
                  sx={{
                    ...customRow?.styles,
                  }}
                >
                  {icon && (
                    <SvgIconStyle
                      src={`/assets/icons/${icon}.svg`}
                      sx={{ width: 20, height: 20, marginRight: 1 }}
                    />
                  )}
                  {contentLocalized ?? (isTotalsRow && t('undefined'))}
                </Typography>
              )}
            </TableCell>
          )
        })}
      {props.rowComponentProps && (
        <TableCell
          align="center"
          sx={{
            borderBottom: '1px solid #EAEEF4',
          }}
        >
          <props.rowComponentProps.component
            index={props.index}
            total={props.total}
            data={props.data}
            {...props.rowComponentProps}
            {...props.rowComponentProps.actions}
          />
        </TableCell>
      )}
      {props.menuProps && (
        <TableCell
          align="center"
          sx={{
            borderBottom: '1px solid #EAEEF4',
            width: '50px',
          }}
        >
          <TableMenu
            {...props.menuProps}
            name={props.name}
            data={props.data}
          />
        </TableCell>
      )}
    </TableRow>
  )
}
