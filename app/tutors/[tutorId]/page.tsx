'use client'

import CustomCard from '@/src/components/CustomCard'
import TitleBar from '@/src/components/TitleBar'
import { getTutorById } from '@/src/services/tutors'
import Page from '@/src/components/Page'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { TUTORS_HEADERS } from '@/schools/[schoolId]/tutors/constants/tutor.headers'
import { deleteStudent, getStudentsByTutorId } from '@/src/services/students'
import StudentTable from '@/schools/[schoolId]/students/sections/StudentTable'
import { Add } from '@mui/icons-material'

export default function TutorStudents() {
  const { push } = useRouter()
  const pathname = usePathname()

  const { tutorId } = useParams<{
    tutorId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['tutor', tutorId],
    queryFn: () => getTutorById(tutorId as string),
    enabled: !!tutorId,
  })

  const {
    data: students,
    isLoading: isLoadingStudents,
    refetch,
  } = useQuery({
    queryKey: ['students', tutorId],
    queryFn: () => getStudentsByTutorId(tutorId as string),
    enabled: !!tutorId,
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => refetch(),
  })

  return (
    <Page>
      <TitleBar
        title="Detalles del Tutor"
        buttonProps={{
          label: 'agregar estudiante',
          icon: <Add />,
          onClick: () => push(`${pathname}/addStudent`),
        }}
      />
      <CustomCard
        title="Detalles"
        data={[data]}
        headers={TUTORS_HEADERS}
        isLoading={isLoading}
      />
      <TitleBar
        title="Estudiantes"
        sx={{ marginTop: 3 }}
      />
      <StudentTable
        data={students}
        isLoading={isLoadingStudents}
        deleteAction={deleteMutation}
      />
    </Page>
  )
}
