'use client'

import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import StudentTable from '@/src/sections/student/StudentTable'
import { deleteStudent, getStudentsByTutorId } from '@/src/services/students'
import { Add } from '@mui/icons-material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'

export default function TutorJoin() {
  const { tutorId } = useParams<{ tutorId: string }>()
  const { push } = useRouter()
  const pathname = usePathname()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tutorStudents', tutorId],
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
        title="Registro de Estudiante"
        buttonProps={{
          label: 'Agregar estudiante',
          icon: <Add />,
          onClick: () => push(`${pathname}/student`),
        }}
      />
      <StudentTable
        data={data}
        isLoading={isLoading}
        deleteAction={deleteMutation}
      />
    </Page>
  )
}
