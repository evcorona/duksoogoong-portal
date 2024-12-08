/* eslint-disable  @typescript-eslint/no-explicit-any */
import { SxProps } from '@mui/material'

export interface ICustomRow {
  value: string
  icon?: string
  styles?: SxProps
  translationOptions?: { [key: string]: string | number }
  redirectTo?: string
  onClick?: () => void
}

export interface ITableData {
  accessor: string
  label?: string
  subLabel?: string
  icon?: string
  align?: 'left' | 'center' | 'right'
  translate?: boolean
  customRow?: (value: any, data?: any) => ICustomRow
}

export interface PropertyHeader<T> {
  accessor: keyof T
  label?: string
  subLabel?: string
  icon?: string
  align?: 'left' | 'center' | 'right'
  translate?: boolean
  customRow?: (value: any, data: T) => ICustomRow
}
