import { IAddress } from '@/src/types/Address'
import { IStudent } from './Student'

export interface ITutor {
  _id?: string
  name: string
  lastName: string
  email?: string
  phone: string
  address: IAddress
  isActive: boolean
  students: string[] | IStudent[]
  userId: string
  schoolId: string
}
