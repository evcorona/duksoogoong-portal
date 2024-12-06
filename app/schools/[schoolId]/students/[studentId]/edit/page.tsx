'use client'

import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import StudentFormEdit from '../../sections/StudentFormEdit'

export default function StudentDetails() {
  return (
    <Page>
      <TitleBar title="Editar estudiante" />
      <StudentFormEdit />
    </Page>
  )
}
