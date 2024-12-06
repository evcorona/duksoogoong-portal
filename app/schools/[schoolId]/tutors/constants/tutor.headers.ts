import { PHONE_MASK } from '@/src/constants/inputMasks'
import formatNumberWithMask from '@/src/utils/formatNumberWithMask'
import { ITableData } from '@/src/types/table/TableData'

export const TUTORS_HEADERS: ITableData[] = [
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
    accessor: 'studentsCount',
    label: 'Estudiantes registrados',
    align: 'left',
    customRow: (value) => ({
      value: `${value} estudiante${value > 1 ? 's' : ''}`,
    }),
  },
]
