'use client'

import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import StudentForm from '@/src/sections/student/StudentForm'
import { Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

export default function StudentJoin() {
  const pathname = usePathname()

  const isStudentRegister = pathname.includes('tutor')

  return (
    <Page>
      <TitleBar title="Registro de Estudiante" />
      {!isStudentRegister && (
        <Typography sx={{ marginBottom: 3 }}>
          Solo mayores de 18 años
        </Typography>
      )}
      <StudentForm />
    </Page>
  )
}
