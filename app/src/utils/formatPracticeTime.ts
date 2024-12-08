import dayjs from 'dayjs'

export function formatPracticeTime(enrollmentDate: Date) {
  const totalMonths = dayjs().diff(enrollmentDate, 'months')
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const label = `${years} años ${months} meses`

  return { months, years, label }
}
