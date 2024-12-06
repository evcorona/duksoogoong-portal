import { IAddress } from './Address'
import { ITeacher } from './Teacher'

export interface IStudent {
  _id?: string
  birthDate: Date | null
  civilStatus: 'married' | 'divorced' | 'separated' | 'single' | 'widowed'
  curp: string
  enrollmentDate: Date | null
  grade: IGrade
  isActive: boolean
  lastName: string
  name: string
  occupation: string
  priorExperienceDays: number
  schoolId: string
  teacherId: string | ITeacher
  ruf?: string
  userId?: string
  tutorId?: string
  nextGrade: IGrade
  address: IAddress
}

interface IGrade {
  value: number | null
  level: 'kup' | 'poom' | 'dan' | null
  lastGradeUpdatedAt?: Date
}
