'use client'

import TitleBar from '@/src/components/TitleBar'
import Page from '@/src/components/Page'
import StudentForm from '@/src/sections/student/StudentForm'

export default function StudentJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm />
    </Page>
  )
}
