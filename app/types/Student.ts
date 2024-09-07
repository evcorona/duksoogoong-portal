import { Dayjs } from 'dayjs'

export interface IStudent {
  name: string
  lastName: string
  civilStatus: string
  occupation: string
  birthDate: Dayjs | null
  timePracticing: number
  periodTime: 'months' | 'years'
  school: string
  teacher: string
  currentGrade: IGrade
  nextGrade: IGrade
}

interface IGrade {
  grade: string | 'ieby' | null
  level: 'dan' | 'kup' | 'poom' | null
}
