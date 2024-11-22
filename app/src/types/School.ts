import { IAddress } from '@/src/types/Address'

export interface ISchool {
  _id?: string
  name: string
  address: IAddress
  isActive: boolean
}
