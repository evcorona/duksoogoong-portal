import { IAddress } from './Address'
import { ISchool } from './School'
import { ITeacher } from './Teacher'
import { ITutor } from './Tutor'

export interface IStudent {
  _id?: string
  address?: IAddress
  birthDate: Date | null
  civilStatus: string
  curp: string
  enrollmentDate: Date | null
  grade: IGrade
  isActive: boolean
  lastName: string
  name: string
  nextGrade: IGrade
  occupation: string
  priorExperienceDays: number
  ruf?: string
  school: ISchool
  schoolId: string
  teacher: ITeacher
  teacherId: string
  tutor?: ITutor
  tutorId?: string
  userId?: string
}

export type IStudentForm = Omit<IStudent, 'school' | 'teacher' | 'tutor'>

export interface IGrade {
  lastGradeUpdatedAt?: Date
  level: 'kup' | 'poom' | 'dan'
  value: number
}
