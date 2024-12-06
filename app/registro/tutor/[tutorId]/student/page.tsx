'use client'

import StudentForm from '@/schools/[schoolId]/students/sections/StudentForm'
import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'

export default function StudentJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm />
    </Page>
  )
}
