/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableFooter,
  Card,
} from '@mui/material'
import TableHeader from 'src/components/CustomTable/TableHeader'
import CustomRow from 'src/components/CustomTable/CustomRow'
import TableSkeleton from 'src/components/CustomTable/TableSkeleton'
import EmptyContent from 'src/components/CustomTable/EmptyContent'
import { useEffect } from 'react'
import CheckboxMenuBar from 'src/components/CustomTable/CheckboxMenuBar'
import { CustomTableProps } from '@/src/types/Table'
import { FilterProps } from '@/src/types/Filter'
import { isEmpty } from 'lodash'

export default function CustomTable(props: CustomTableProps) {
  const isEmptyContent = !props.isLoading && isEmpty(props.data)
  const allHeaders = [...props.headers]

  useEffect(() => {
    const { data, checkboxFeature, selectRowProps } = props

    if (checkboxFeature?.handleAllChecked)
      checkboxFeature.handleAllChecked(false)
    if (isEmpty(data) || !!selectRowProps?.setSelectedRow) return
    if (!selectRowProps?.skipFirstSelection)
      selectRowProps?.setSelectedRow(data[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.checkboxFeature, props.selectRowProps])

  if (props.rowComponentProps || props.menuProps)
    allHeaders.push({
      accessor: '',
      label: ' ',
    })

  return (
    <Card
      sx={{
        width: '100%',
        overflow: 'auto',
        backgroundColor: '#F4F4F4',
        borderRadius: '16px',
        ...props.sx,
      }}
    >
      {props.checkboxFeature && <CheckboxMenuBar {...props.checkboxFeature} />}
      <TableContainer
        sx={{
          maxHeight: '62vh',
          minWidth: !props.autoWidth ? 800 : 'auto',
        }}
      >
        <Table size={props.size} stickyHeader={!props.disableStickyHeader}>
          <TableHeader
            headers={allHeaders}
            size={props.size}
            {...props.checkboxFeature}
          />
          <TableBody>
            {props.isLoading && (
              <TableSkeleton
                rowsNumber={props.pagination?.limit || 10}
                cellsNumber={allHeaders?.length + 1 || 10}
              />
            )}
            {isEmptyContent && (
              <EmptyContent
                title={`empty_table.${props.name ?? 'common'}.title`}
                description={`empty_table.${
                  props.name ?? 'common'
                }.description`}
              />
            )}
            {!isEmptyContent &&
              !props.isLoading &&
              props.data.map((row: any, i: number) => (
                <CustomRow
                  key={`tableRow-${i}`}
                  index={i}
                  total={props.data.length}
                  size={props.size}
                  data={row}
                  hasTotals={props.hasTotals}
                  headers={props.headers}
                  idAccessor={props.idAccessor}
                  menuProps={props.menuProps}
                  selectRowProps={props.selectRowProps}
                  name={props.name}
                  customChildren={props.dynamicRow?.(row, i)}
                  customStyle={props.rowStyle?.(row) || {}}
                  rowComponentProps={props.rowComponentProps}
                  {...props.checkboxFeature}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {props.setFilter && props.pagination && (
        <TableFooter
          sx={{
            justifyContent: 'flex-end',
            width: '100%',
            display: 'flex',
            backgroundColor: 'white',
            borderTop: '1px solid rgba(145, 158, 171, 0.24)',
          }}
        >
          <TableRow>
            <TablePagination
              width='100%'
              page={props.pagination?.page}
              count={props.pagination?.total}
              rowsPerPage={props.pagination?.limit}
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              onRowsPerPageChange={(event: any) => {
                props.setFilter &&
                  props.setFilter((state: FilterProps) => ({
                    ...state,
                    limit: event.target.value,
                  }))
              }}
              onPageChange={(_, value) => {
                props.setFilter &&
                  props.setFilter((state: any) => ({
                    ...state,
                    page: value,
                  }))
              }}
              sx={{
                justifyContent: 'flex-end',
              }}
            />
          </TableRow>
        </TableFooter>
      )}
    </Card>
  )
}
