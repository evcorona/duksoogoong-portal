'use client'

import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import StudentForm from '@/src/sections/student/StudentForm'

export default function StudentDetails() {
  return (
    <Page>
      <TitleBar title="Editar estudiante" />
      <StudentForm />
    </Page>
  )
}
