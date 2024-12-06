import CustomTable from '@/src/components/CustomTable/CustomTable'

import { IStudent } from '@/src/types/Student'
import { STUDENTS_HEADERS } from '../constants/students.headers'
import { useRouter } from 'next/navigation'

type Props = {
  data: IStudent[]
  isLoading: boolean
  deleteAction: any
}

export default function StudentTable(props: Props) {
  const { push } = useRouter()

  return (
    <CustomTable
      size="small"
      name="students"
      headers={STUDENTS_HEADERS}
      data={props.data || []}
      isLoading={props.isLoading}
      menuProps={{
        editAction: (data) =>
          push(`schools/${data?.schoolId}/students/${data?._id}/edit`),
        deleteAction: (data) => props.deleteAction(data?._id),
      }}
      sx={{ marginTop: 2, paddingBottom: 2 }}
    />
  )
}
