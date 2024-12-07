import { IAddress } from './Address'
import { ISchool } from './School'
import { ITeacher } from './Teacher'
import { ITutor } from './Tutor'

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
  schoolId: string | ISchool
  teacherId: string | ITeacher
  ruf?: string
  userId?: string
  tutorId?: string | ITutor
  nextGrade: IGrade
  address: IAddress
}

export interface IGrade {
  value: number | null
  level: 'kup' | 'poom' | 'dan' | null
  lastGradeUpdatedAt?: Date
}
