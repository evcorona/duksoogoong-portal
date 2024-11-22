'use client'

import TutorForm from '@/schools/[schoolId]/tutors/sections/TutorsForm'
import TitleBar from '@/src/components/TitleBar'
import { Container } from '@mui/material'

export default function TutorJoin() {
  return (
    <Container maxWidth='xl' sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar title='Registro de Tutor' />
      <TutorForm />
    </Container>
  )
}
