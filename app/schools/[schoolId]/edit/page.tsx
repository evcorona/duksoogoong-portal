'use client'

import TitleBar from '@/src/components/TitleBar'
import SchoolForm from '@/schools/sections/SchoolForm'
import Page from '@/src/components/Page'

export default function EditSchool() {
  return (
    <Page>
      <TitleBar title="Editar escuela" />
      <SchoolForm />
    </Page>
  )
}
