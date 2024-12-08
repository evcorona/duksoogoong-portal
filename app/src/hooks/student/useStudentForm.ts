import DEFAULT_STUDENT_VALUES from '@/src/constants/student/student.default.values'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import schema from '@/src/constants/student/student.schema'
import { KUP_VALUES, DAN_VALUES } from '@/src/constants/business'
import { useEffect } from 'react'
import { IStudent } from '@/src/types/Student'
import { isNumber } from 'lodash'
import { getGradeLabel } from '@/src/utils/formatGrades'
import formatPriorExperienceDays from '@/src/utils/formatPriorExperienceDays'

type Props = { studentToEdit?: IStudent }

export default function useStudentForm(props: Props) {
  const methods = useForm<any>({
    mode: 'onTouched',
    defaultValues: DEFAULT_STUDENT_VALUES,
    resolver: yupResolver(schema),
  })

  const { watch, setValue, reset, resetField } = methods

  const birthDate = watch('birthDate')
  const age = dayjs().diff(birthDate, 'year')
  const currentGrade = watch('grade.value')
  const currentGradeLevel = watch('grade.level')
  const nextGrade = watch('nextGrade')
  const timePracticing = watch('timePracticing')
  const periodTime = watch('periodTime')

  useEffect(() => {
    if (props.studentToEdit) {
      const timePracticing = formatPriorExperienceDays(
        props.studentToEdit.priorExperienceDays,
      )
      reset({
        ...props.studentToEdit,
        birthDate: dayjs(props.studentToEdit.birthDate).format('YYYY-MM-DD'),
        enrollmentDate: dayjs(props.studentToEdit.enrollmentDate).format(
          'YYYY-MM-DD',
        ),
        timePracticing: timePracticing.value,
        periodTime: timePracticing.periodType,
      })
    }
  }, [props.studentToEdit])

  useEffect(() => {
    if (currentGrade === null || !currentGradeLevel) return

    const currentBlackType =
      currentGradeLevel === 'dan' || currentGradeLevel === 'poom'
    const typeBlackGrade = age < 15 ? 'poom' : 'dan'
    let nextGrade = DEFAULT_STUDENT_VALUES.nextGrade

    if (currentBlackType)
      nextGrade = {
        value: Number(currentGrade) + 1,
        level: typeBlackGrade,
      }
    if (currentGradeLevel === 'kup')
      nextGrade = {
        value: Number(currentGrade) - 1,
        level: 'kup',
      }
    if (currentGradeLevel === 'kup' && currentGrade === 0) {
      resetField('grade')
      resetField('nextGrade')
    }
    if (currentGradeLevel === 'kup' && currentGrade === 1)
      nextGrade = {
        value: 0,
        level: typeBlackGrade,
      }
    setValue('nextGrade', nextGrade)
  }, [currentGrade, currentGradeLevel, age])

  useEffect(() => {
    if (timePracticing === null || periodTime === null)
      setValue('priorExperienceDays', 0)

    const periodTimeMultiplier = periodTime === 'months' ? 30 : 365
    const timePracticingInDays = timePracticing * periodTimeMultiplier

    setValue('priorExperienceDays', timePracticingInDays)
  }, [timePracticing, periodTime])

  return {
    methods,
    gradesOptions: currentGradeLevel
      ? currentGradeLevel === 'kup'
        ? KUP_VALUES
        : DAN_VALUES
      : [],
    ageLabel: birthDate && `${age} años`,
    displayNextGrade: isNumber(currentGrade),
    nextGradeLabel: getGradeLabel(nextGrade),
  }
}
