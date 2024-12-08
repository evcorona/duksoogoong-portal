import dayjs from 'dayjs'

export function formatPracticeTime(enrollmentDate: Date) {
  const totalMonths = dayjs().diff(enrollmentDate, 'months')
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const yearsLabel = years ? `${years} años` : ''
  const monthsLabel = months ? `${months} meses` : ''

  const label = `${yearsLabel} ${monthsLabel}`.trim()

  return { months, years, label }
}
