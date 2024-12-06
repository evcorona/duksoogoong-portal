'use client'

import TitleBar from '@/src/components/TitleBar'
import TeacherForm from '@/schools/[schoolId]/teachers/sections/TeacherForm'
import Page from '@/src/components/Page'

export default function EditTeacher() {
  return (
    <Page>
      <TitleBar title="Editar profesor" />
      <TeacherForm />
    </Page>
  )
}
