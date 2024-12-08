'use client'

import TitleBar from '@/src/components/TitleBar'
import { deleteStudent } from '@/src/services/students'
import Page from '@/src/components/Page'
import { useMutation } from '@tanstack/react-query'
import StudentTable from '@/src/sections/student/StudentTable'
import useStudentQueries from '@/src/hooks/student/useStudentQueries'

export default function StudentsBySchool() {
  const { studentsBySchool, isLoading, refetchAll } = useStudentQueries({
    enableQueryAll: true,
  })

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => refetchAll(),
  })

  return (
    <Page>
      <TitleBar title="Estudiantes" />
      <StudentTable
        data={studentsBySchool || []}
        isLoading={isLoading}
        deleteAction={deleteMutation}
      />
    </Page>
  )
}
