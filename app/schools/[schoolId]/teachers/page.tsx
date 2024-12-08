'use client'

import CustomTable from '@/src/components/CustomTable/CustomTable'
import TitleBar from '@/src/components/TitleBar'
import { TEACHERS_HEADERS } from '@/schools/[schoolId]/teachers/constants/teacher.headers'
import { deleteTeacher, getTeachersBySchoolId } from '@/src/services/teachers'
import { Add } from '@mui/icons-material'
import Page from '@/src/components/Page'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import SeeDetailButton from '@/src/components/CustomTable/SeeDetailButton'
import { ITeacher } from '@/src/types/Teacher'

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
    <Page>
      <TitleBar
        title="Profesores"
        buttonProps={{
          label: 'crear profesor',
          icon: <Add />,
          onClick: () => push(`${pathname}/create`),
        }}
      />
      <CustomTable
        name="teachers"
        headers={TEACHERS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
        rowComponentProps={{
          actions: { href: (row: ITeacher) => `${pathname}/${row?._id}` },
          component: SeeDetailButton,
        }}
      />
    </Page>
  )
}
