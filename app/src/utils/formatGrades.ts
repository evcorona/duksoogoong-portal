import { IGrade } from '../types/Student'
import DEFAULT_STUDENT_VALUES from '@/src/constants/student/student.default.values'

export function getGradeLabel(grade: IGrade) {
  const value = grade?.value === 0 ? 'Ieby' : grade?.value
  const level = grade?.level

  const formatGrade = value === 11 ? 'Principiante' : `${value}° ${level}`

  return `${formatGrade}`
}

export function getNextGrade(currentGrade: IGrade, age: number) {
  const { value: gradeValue, level: gradeLevel } = currentGrade

  const currentBlackType = gradeLevel === 'dan' || gradeLevel === 'poom'
  const typeBlackGrade = age < 15 ? 'poom' : 'dan'

  let nextGrade = DEFAULT_STUDENT_VALUES.nextGrade

  if (currentBlackType)
    nextGrade = {
      value: Number(gradeValue) + 1,
      level: typeBlackGrade,
    }
  if (gradeLevel === 'kup')
    nextGrade = {
      value: Number(gradeValue) - 1,
      level: 'kup',
    }
  if (gradeLevel === 'kup' && gradeValue === 0) {
    nextGrade = {
      value: 1,
      level: typeBlackGrade,
    }
  }
  if (gradeLevel === 'kup' && gradeValue === 1)
    nextGrade = {
      value: 0,
      level: typeBlackGrade,
    }

  const label = `${nextGrade.value}° ${nextGrade.level}`

  return { nextGrade, label }
}
