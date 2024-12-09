import { PropertyHeader } from '@/src/types/table/TableData'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getGradeLabel } from '@/src/utils/formatGrades'
import formatPriorExperienceDays from '@/src/utils/formatPriorExperienceDays'
import { IStudent } from '@/src/types/Student'
import { formatPracticeTime } from '@/src/utils/formatPracticeTime'
dayjs.extend(duration)

interface StudentsPropertiesHeaders {
  age: PropertyHeader<IStudent>
  birthDate: PropertyHeader<IStudent>
  civilStatus: PropertyHeader<IStudent>
  curp: PropertyHeader<IStudent>
  enrollmentDate: PropertyHeader<IStudent>
  grade: PropertyHeader<IStudent>
  name: PropertyHeader<IStudent>
  occupation: PropertyHeader<IStudent>
  practiceTime: PropertyHeader<IStudent>
  priorExperienceDays: PropertyHeader<IStudent>
  hasPriorExperienceDays: PropertyHeader<IStudent>
  ruf: PropertyHeader<IStudent>
  school: PropertyHeader<IStudent>
  teacher: PropertyHeader<IStudent>
  tutor: PropertyHeader<IStudent>
}

export const STUDENTS_PROPERTIES_HEADERS: StudentsPropertiesHeaders = {
  name: {
    accessor: 'name',
    label: 'Nombre',
    align: 'left',
    customRow: (value: Pick<IStudent, 'name'>, data: IStudent) => ({
      value: `${value} ${data.lastName}`,
      styles: { textTransform: 'capitalize', whiteSpace: 'nowrap' },
    }),
  },
  birthDate: {
    accessor: 'birthDate',
    label: 'Fecha de nacimiento',
    align: 'left',
    customRow: (value) => ({
      value: dayjs(value).format('YYYY/MM/DD'),
    }),
  },
  age: {
    accessor: 'birthDate',
    label: 'Edad',
    align: 'left',
    customRow: (value) => ({
      value: `${dayjs().diff(value, 'year')} años`,
      styles: { whiteSpace: 'nowrap' },
    }),
  },
  civilStatus: {
    accessor: 'civilStatus',
    label: 'Estado Civil',
    align: 'left',
    customRow: (value: string) => ({
      value,
      styles: { textTransform: 'capitalize' },
    }),
  },
  curp: {
    accessor: 'curp',
    label: 'CURP',
    align: 'left',
  },
  enrollmentDate: {
    accessor: 'enrollmentDate',
    label: 'Fecha de inscripción',
    align: 'left',
    customRow: (value) => ({ value: dayjs(value).format('YYYY/MM/DD') }),
  },
  practiceTime: {
    accessor: 'enrollmentDate',
    label: 'Tiempo de inscripción',
    align: 'left',
    customRow: (value) => ({
      value: formatPracticeTime(value).label,
      styles: { whiteSpace: 'nowrap' },
    }),
  },
  grade: {
    accessor: 'grade',
    label: 'Grado',
    align: 'left',
    customRow: (value) => ({
      value: getGradeLabel(value),
      styles: { whiteSpace: 'nowrap' },
    }),
  },
  occupation: {
    accessor: 'occupation',
    label: 'Ocupación',
    align: 'left',
    customRow: (value) => ({ value, styles: { textTransform: 'capitalize' } }),
  },
  priorExperienceDays: {
    accessor: 'priorExperienceDays',
    label: 'Tiempo de practica previa',
    align: 'left',
    customRow: (value) => ({ value: formatPriorExperienceDays(value).label }),
  },
  hasPriorExperienceDays: {
    accessor: 'priorExperienceDays',
    label: 'Con Experiencia Previa',
    align: 'left',
    customRow: (value) => ({ value: value ? 'Si' : 'No' }),
  },
  ruf: {
    accessor: 'ruf',
    label: 'RUF',
    align: 'left',
    customRow: (value) => ({ value: value || 'Sin registro' }),
  },
  teacher: {
    accessor: 'teacher',
    label: 'Profesor',
    align: 'left',
    customRow: (value) => ({
      value: `${value?.name} ${value?.lastName}`,
      styles: { textTransform: 'capitalize', whiteSpace: 'nowrap' },
    }),
  },
  school: {
    accessor: 'school',
    label: 'Escuela',
    align: 'left',
    customRow: (value) => ({
      value: value?.name,
      styles: { textTransform: 'capitalize', whiteSpace: 'nowrap' },
    }),
  },
  tutor: {
    accessor: 'tutor',
    label: 'Tutor',
    align: 'left',
    customRow: (value) => ({
      value: value ? `${value?.name} ${value?.lastName}` : 'N/A',
      styles: { textTransform: 'capitalize', whiteSpace: 'nowrap' },
    }),
  },
}
