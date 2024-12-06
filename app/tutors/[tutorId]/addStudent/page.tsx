'use client'

import StudentForm from '@/schools/[schoolId]/students/sections/StudentForm'
import TitleBar from '@/src/components/TitleBar'
import Page from '@/src/components/Page'

export default function StudentJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm />
    </Page>
  )
}
