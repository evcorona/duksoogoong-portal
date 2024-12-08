import { ITableData } from '@/src/types/table/TableData'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { STUDENTS_PROPERTIES_HEADERS } from './students.properties.headers'
dayjs.extend(duration)

const {
  age,
  birthDate,
  civilStatus,
  curp,
  enrollmentDate,
  grade,
  name,
  occupation,
  practiceTime,
  priorExperienceDays,
  hasPriorExperienceDays,
  ruf,
  school,
  teacher,
  tutor,
} = STUDENTS_PROPERTIES_HEADERS

export const STUDENTS_HEADERS: ITableData[] = [
  name,
  birthDate,
  age,
  practiceTime,
  grade,
  hasPriorExperienceDays,
  teacher,
  school,
]

export const STUDENTS_DETAILS_HEADERS: ITableData[] = [
  name,
  birthDate,
  age,
  civilStatus,
  occupation,
  curp,
  ruf,
  enrollmentDate,
  practiceTime,
  priorExperienceDays,
  grade,
  school,
  teacher,
  tutor,
]
