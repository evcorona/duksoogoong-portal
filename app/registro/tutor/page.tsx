'use client'

import TutorForm from '@/schools/[schoolId]/tutors/sections/TutorsForm'
import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'

export default function TutorJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Tutor" />
      <TutorForm />
    </Page>
  )
}
