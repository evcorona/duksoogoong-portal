import { ITableData } from '@/src/types/table/TableData'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

export const STUDENTS_HEADERS: ITableData[] = [
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
    accessor: 'birthDate',
    label: 'Fecha de nacimiento',
    align: 'left',
    customRow: (value) => ({ value: dayjs(value).format('YYYY/MM/DD') }),
  },
  {
    accessor: 'birthDate',
    label: 'Edad',
    align: 'left',
    customRow: (value) => ({ value: `${dayjs().diff(value, 'year')} años` }),
  },
  {
    accessor: 'grade',
    label: 'Grado',
    align: 'left',
    customRow: (value) => {
      const grade = value?.value === 0 ? 'Ieby' : value?.value
      const level = value?.level

      return { value: `${grade}° ${level}` }
    },
  },
  {
    accessor: 'teacherId',
    label: 'Profesor',
    align: 'left',
    customRow: (value) => ({
      value: `${value?.name} ${value?.lastName}`,
      styles: { textTransform: 'capitalize' },
    }),
  },
  {
    accessor: 'schoolId',
    label: 'Escuela',
    align: 'left',
    customRow: (value) => ({
      value: value?.name,
      styles: { textTransform: 'capitalize' },
    }),
  },
]
