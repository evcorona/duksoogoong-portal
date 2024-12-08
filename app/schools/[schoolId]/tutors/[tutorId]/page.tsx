'use client'

import CustomCard from '@/src/components/CustomCard'
import TitleBar from '@/src/components/TitleBar'
import { getTutorById } from '@/src/services/tutors'
import Page from '@/src/components/Page'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { deleteStudent, getStudentsByTutorId } from '@/src/services/students'
import { TUTORS_DETAILS_HEADERS } from '../constants/tutor.details.headers'
import StudentTable from '@/src/sections/student/StudentTable'
import { IPayload } from '@/src/store/userSlice'
import { useSelector } from 'react-redux'
import { Add } from '@mui/icons-material'

export default function TutorDetails() {
  const { push } = useRouter()
  const pathname = usePathname()
  const { tutorId } = useParams<{
    tutorId: string
  }>()

  const { role } = useSelector((state: { user: IPayload }) => state.user)
  const isTutor = role === 'tutor'

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

  const buttonProps = isTutor
    ? {
        label: 'agregar estudiante',
        icon: <Add />,
        onClick: () => push(`${pathname}/addStudent`),
      }
    : undefined

  return (
    <Page>
      <TitleBar
        title="Detalles del Tutor"
        buttonProps={buttonProps}
      />
      <CustomCard
        title="Detalles"
        data={[data]}
        headers={TUTORS_DETAILS_HEADERS}
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
