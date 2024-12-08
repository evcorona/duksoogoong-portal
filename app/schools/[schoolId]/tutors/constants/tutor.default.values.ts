import ADDRESS_DEFAULT_VALUES from '@/src/constants/address/address.default.values'
import { ITutor } from '@/src/types/Tutor'

const DEFAULT_TUTOR_VALUES: ITutor = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: ADDRESS_DEFAULT_VALUES,
  isActive: true,
  students: [],
  userId: '',
  schoolId: '',
}

export default DEFAULT_TUTOR_VALUES
