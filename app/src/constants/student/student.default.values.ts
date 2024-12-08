import ADDRESS_DEFAULT_VALUES from '@/src/constants/address/address.default.values'
import { IStudentForm } from '@/src/types/Student'

const DEFAULT_STUDENT_VALUES: IStudentForm = {
  name: '',
  lastName: '',
  curp: '',
  ruf: '',
  civilStatus: 'soltero(a)',
  occupation: '',
  birthDate: null,
  enrollmentDate: null,
  priorExperienceDays: 0,
  isActive: true,
  grade: {
    value: 11,
    level: 'kup',
    lastGradeUpdatedAt: undefined,
  },
  schoolId: '',
  teacherId: '',
  userId: undefined,
  tutorId: undefined,
  address: ADDRESS_DEFAULT_VALUES,
  nextGrade: {
    value: 10,
    level: 'kup',
  },
}

export default DEFAULT_STUDENT_VALUES
