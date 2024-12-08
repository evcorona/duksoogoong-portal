'use client'

import CustomCard from '@/src/components/CustomCard'
import Page from '@/src/components/Page'
import TitleBar from '@/src/components/TitleBar'
import { Download, Edit, FileOpen } from '@mui/icons-material'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getStudentById } from '@/src/services/students'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@mui/material'
import CustomModal from '@/src/components/CustomModal'
import { useState } from 'react'
import { IStudent } from '@/src/types/Student'
import ExamFormat from '@/schools/[schoolId]/students/sections/ExamFormat'
import downloadPdf from '@/src/utils/downloadPdf'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { STUDENTS_DETAILS_HEADERS } from '../../../../src/constants/student/students.headers'

export default function StudentDetails() {
  const [openModal, setOpenModal] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const { push } = useRouter()
  const pathname = usePathname()
  const { studentId } = useParams<{ studentId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentById(studentId),
    enabled: !!studentId,
  })

  const modalToggle = () => setOpenModal(!openModal)

  const handleDownload = async () => {
    setIsDownloading(true)

    try {
      const downloadDate = dayjs().format('YYYY_MM')
      const studentName = `${data?.name}`.replace(/\s/g, '_')
      const fileName = `solicitudExamen_${studentName}_${downloadDate}`

      await downloadPdf(fileName, 'exam-format')
    } catch (error) {
      toast.error('Error al descargar el archivo')
    } finally {
      setOpenModal(false)
      setIsDownloading(false)
      toast.success('Archivo descargado exitosamente')
    }
  }

  return (
    <Page>
      <TitleBar
        title="Estudiante"
        buttonProps={{
          label: 'editar estudiante',
          icon: <Edit />,
          onClick: () => push(`${pathname}/edit`),
          disabled: isLoading || !data,
        }}
        extraContent={
          <Button
            variant="outlined"
            startIcon={<FileOpen />}
            onClick={modalToggle}
            disabled={isLoading || !data}
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
            handleAction: handleDownload,
            isLoading: isDownloading,
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
