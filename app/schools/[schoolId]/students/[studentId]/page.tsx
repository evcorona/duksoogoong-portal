'use client'

import CustomCard from '@/src/components/CustomCard'
import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import { Add } from '@mui/icons-material'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { STUDENTS_DETAILS_HEADERS } from '../constants/students.details.headers'
import { getStudentById } from '@/src/services/students'
import { useQuery } from '@tanstack/react-query'

export default function StudentDetails() {
  const { push } = useRouter()
  const pathname = usePathname()

  const { studentId } = useParams<{
    studentId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentById(studentId as string),
    enabled: !!studentId,
  })

  return (
    <Page>
      <TitleBar
        title="Estudiante"
        buttonProps={{
          label: 'editar estudiante',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomCard
        title="Detalles"
        data={[data]}
        headers={STUDENTS_DETAILS_HEADERS}
        isLoading={isLoading}
        columnHeight={230}
      />
    </Page>
  )
}
