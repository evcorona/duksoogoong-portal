import { ITableData } from '@/src/types/table/TableData'

export const SCHOOLS_HEADERS: ITableData[] = [
  {
    accessor: 'name',
    label: 'Nombre',
    align: 'left',
    customRow: (value) => ({ value, styles: { textTransform: 'capitalize' } }),
  },
  {
    accessor: 'address',
    label: 'Domicilio',
    align: 'left',
    customRow: (value) => ({
      value: value?.address,
      styles: { textTransform: 'capitalize' },
    }),
  },
  {
    accessor: 'address',
    label: 'Estado',
    align: 'left',
    customRow: (value) => ({
      value: value?.state,
      styles: { textTransform: 'capitalize' },
    }),
  },
  {
    accessor: 'address',
    label: 'Ciudad',
    align: 'left',
    customRow: (value) => ({
      value: value?.city,
      styles: { textTransform: 'capitalize' },
    }),
  },
  {
    accessor: 'address',
    label: 'Código postal',
    align: 'left',
    customRow: (value) => ({ value: value?.zipCode }),
  },
]
