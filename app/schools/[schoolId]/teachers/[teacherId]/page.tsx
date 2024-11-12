'use client'

import CustomCard from '@/src/components/CustomCard'
import TitleBar from '@/src/components/TitleBar'
import { getTeacherById } from '@/src/services/teachers'
import { Add } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { TEACHERS_HEADERS } from '../constants/teacher.headers'

export default function TeacherStudents() {
  const { push } = useRouter()
  const pathname = usePathname()
  const { teacherId } = useParams<{
    teacherId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacherById(teacherId as string),
    enabled: !!teacherId,
  })

  return (
    <Container maxWidth='xl' sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title='Detalles del Profesor' />
      <CustomCard
        title='Detalles'
        data={[data]}
        headers={TEACHERS_HEADERS}
        isLoading={isLoading}
      />
      <TitleBar
        title='Estudiantes'
        buttonProps={{
          label: 'crear estudiante',
          icon: <Add />,
          onClick: () => push(`${pathname}/student/create`),
        }}
        sx={{
          marginTop: 3,
        }}
      />
    </Container>
  )
}
