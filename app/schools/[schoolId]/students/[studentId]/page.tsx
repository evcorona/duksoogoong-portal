'use client'

import CustomCard from '@/src/components/CustomCard'
import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import { Download, Edit, FileOpen } from '@mui/icons-material'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { STUDENTS_DETAILS_HEADERS } from '../constants/students.details.headers'
import { getStudentById } from '@/src/services/students'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@mui/material'
import CustomModal from '@/src/components/CustomModal'
import { useState } from 'react'

import { IStudent } from '@/src/types/Student'
import ExamFormat from '../sections/ExamFormat'
import downloadPdf from '@/src/utils/downloadPdf'

export default function StudentDetails() {
  const [openModal, setOpenModal] = useState(false)

  const { push } = useRouter()
  const pathname = usePathname()

  const { studentId } = useParams<{
    studentId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentById(studentId as string),
    enabled: !!studentId,
  })

  const modalToggle = () => setOpenModal(!openModal)

  return (
    <Page>
      <TitleBar
        title="Estudiante"
        buttonProps={{
          label: 'editar estudiante',
          icon: <Edit />,
          onClick: () => push(`${pathname}/edit`),
        }}
        extraContent={
          <Button
            variant="outlined"
            startIcon={<FileOpen />}
            onClick={modalToggle}
          >
            Formato para examen
          </Button>
        }
      />
      <CustomCard
        title="Detalles"
        data={[data]}
        headers={STUDENTS_DETAILS_HEADERS}
        isLoading={isLoading}
        columnHeight={230}
      />
      <CustomModal
        title="Formato para examen"
        open={openModal}
        handleClose={modalToggle}
        dialogActions={[
          {
            actionLabel: 'Corregir datos',
            handleAction: modalToggle,
          },
          {
            actionLabel: 'Descargar PDF',
            handleAction: () => downloadPdf('solicitudExamen', 'exam-format'),
            isLoading: false,
            autoFocus: true,
            icon: <Download />,
          },
        ]}
        maxWidth="lg"
      >
        <ExamFormat data={data as IStudent} />
      </CustomModal>
    </Page>
  )
}
