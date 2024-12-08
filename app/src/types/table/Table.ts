/* eslint-disable  @typescript-eslint/no-explicit-any */

import { CheckboxFeature } from './CheckboxFeature'
import { ReactElement } from 'react'
import { SxProps } from '@mui/material'
import { ITableData } from './TableData'

export interface CustomTableProps {
  headers: ITableData[]
  data: any
  isLoading: boolean
  size?: 'small' | 'medium'
  autoWidth?: boolean
  name?: string
  hasTotals?: boolean
  idAccessor?: string
  pagination?: {
    page: number
    limit: number
    total: number
  }
  setFilter?: (state: any) => void
  checkboxFeature?: CheckboxFeature
  menuProps?: TableMenuProps
  selectRowProps?: SelectRowProps
  dynamicRow?: (row: any, index: number) => ReactElement
  rowStyle?: (row: any) => SxProps
  rowComponentProps?: RowComponentProps
  sx?: SxProps
  disableStickyHeader?: boolean
}

export interface CustomRowProps {
  index: number
  total: number
  customChildren?: ReactElement
  data: any
  headers: ITableData[]
  idAccessor?: string
  size?: 'small' | 'medium'
  hasTotals?: boolean
  rowsChecked?: any[]
  setRowsChecked?: (rows: any, checked: boolean) => void
  menuProps?: TableMenuProps
  selectRowProps?: SelectRowProps
  name?: string
  customStyle?: SxProps
  rowComponentProps?: RowComponentProps
}

export interface TableMenuProps {
  editAction: (rowData: any) => void
  deleteAction: (rowData: any) => void
  extraButton?: {
    label: string
    icon: ReactElement
    action: (rowData: any) => void
  }
  name?: string
}

export interface SelectRowProps {
  selectedRow: any
  skipFirstSelection?: boolean
  setSelectedRow: (row: any) => void
}

export interface RowComponentProps {
  component: any
  actions: any
  label?: string
  icon?: ReactElement
  sx?: SxProps
}
