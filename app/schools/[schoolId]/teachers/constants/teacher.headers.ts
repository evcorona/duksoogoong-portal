import { PHONE_MASK } from '@/src/constants/inputMasks'
import formatNumberWithMask from '@/src/utils/formatNumberWithMask'
import { ITableData } from '@/src/types/table/TableData'

export const TEACHERS_HEADERS: ITableData[] = [
  {
    accessor: 'name',
    label: 'Nombre',
    align: 'left',
    customRow: (value) => ({ value, styles: { textTransform: 'capitalize' } }),
  },
  {
    accessor: 'lastName',
    label: 'Apellidos',
    align: 'left',
    customRow: (value) => ({ value, styles: { textTransform: 'capitalize' } }),
  },
  {
    accessor: 'phone',
    label: 'Teléfono',
    align: 'left',
    customRow: (value) => ({
      value: formatNumberWithMask(value, PHONE_MASK),
      styles: { whiteSpace: 'nowrap' },
    }),
  },
  {
    accessor: 'isAdmin',
    label: 'Rol',
    align: 'left',
    customRow: (value) => ({
      value: value ? 'Administrador' : 'Profesor',
      styles: {
        color: value ? 'blue' : 'purple',
        backgroundColor: value ? 'lightblue' : 'lavender',
        borderRadius: '4px',
        paddingX: 2,
        fontWeight: 'bold',
        textAlign: 'left',
        width: 'fit-content',
      },
    }),
  },
  {
    accessor: 'grade',
    label: 'Grado',
    align: 'left',
    customRow: (value) => ({
      value: `${value}º dan`,
      styles: { whiteSpace: 'nowrap' },
    }),
  },
  {
    accessor: 'userId',
    label: 'Email',
    align: 'left',
    customRow: (value) => ({ value: value?.email }),
  },
]
