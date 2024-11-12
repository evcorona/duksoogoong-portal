'use client'

import CustomTable from '@/src/components/CustomTable/CustomTable'
import TitleBar from '@/src/components/TitleBar'
import { TEACHERS_HEADERS } from '@/schools/[schoolId]/teachers/constants/teacher.headers'
import { getTeachersBySchoolId, deleteTeacher } from '@/src/services/teachers'
import { Add } from '@mui/icons-material'
import { Container } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter, usePathname, useParams } from 'next/navigation'

export default function Teachers() {
  const { push } = useRouter()
  const pathname = usePathname()
  const { schoolId } = useParams<{ schoolId: string }>()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['schoolTeachers', schoolId],
    queryFn: () => getTeachersBySchoolId(schoolId as string),
    enabled: !!schoolId,
  })

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => refetch(),
  })

  return (
    <Container maxWidth='xl' sx={{ paddingY: { xs: 2, sm: 4 } }}>
      <TitleBar
        title='Profesores'
        buttonProps={{
          label: 'crear profesor',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        size='small'
        name='teachers'
        headers={TEACHERS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
      />
    </Container>
  )
}
