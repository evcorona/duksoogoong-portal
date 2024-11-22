import CustomTable from '@/src/components/CustomTable/CustomTable'

import { IStudent } from '@/src/types/Student'
import { STUDENTS_HEADERS } from '../constants/students.headers'

type Props = {
  data: IStudent[]
  isLoading: boolean
}

export default function StudentTable(props: Props) {
  return (
    <CustomTable
      size='small'
      name='students'
      headers={STUDENTS_HEADERS}
      data={props.data || []}
      isLoading={props.isLoading}
      // menuProps={{
      //   editAction: (data) => push(`${pathname}/${data?._id}/edit`),
      //   deleteAction: (data) => deleteMutation(data?._id),
      // }}
      sx={{ marginTop: 2, paddingBottom: 2 }}
      // rowComponentProps={{
      //   actions: {
      //     href: (row: any) => `${pathname}/${row?._id}`,
      //     openInNewTab: true,
      //   },
      //   component: SeeDetailButton,
      // }}
    />
  )
}
