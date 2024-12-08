import dayjs from 'dayjs'
import durationPlugin from 'dayjs/plugin/duration'

dayjs.extend(durationPlugin)

export default function formatPriorExperienceDays(priorExperienceDays: number) {
  const result = {
    label: 'Sin experiencia previa',
    value: 0,
  }

  if (!priorExperienceDays) return result

  const DAYS_IN_YEAR = 365
  const duration = dayjs.duration({ days: priorExperienceDays })
  const totalDays = duration.asDays()

  if (totalDays < DAYS_IN_YEAR) {
    const months = Math.round(duration.asMonths())
    result.value = months
    result.label = `${months} meses`
  } else {
    const years = Math.round(duration.asYears())
    result.value = years
    result.label = `${years} años`
  }

  return result
}
