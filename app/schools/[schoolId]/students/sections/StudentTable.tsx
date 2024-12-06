import CustomTable from '@/src/components/CustomTable/CustomTable'

import { IStudent } from '@/src/types/Student'
import { STUDENTS_HEADERS } from '../constants/students.headers'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ISchool } from '@/src/types/School'

type Props = {
  data: IStudent[]
  isLoading: boolean
  deleteAction: any
}

export default function StudentTable(props: Props) {
  const [selectedRow, setSelectedRow] = useState<IStudent | null>(null)

  const { push } = useRouter()

  useEffect(() => {
    if (selectedRow) {
      const schoolId = selectedRow?.schoolId as ISchool

      push(`/schools/${schoolId?._id}/students/${selectedRow?._id}`)
    }
  }, [selectedRow])

  return (
    <CustomTable
      size="small"
      name="students"
      headers={STUDENTS_HEADERS}
      data={props.data || []}
      isLoading={props.isLoading}
      menuProps={{
        editAction: (data) =>
          push(`/schools/${data?.schoolId?._id}/students/${data?._id}/edit`),
        deleteAction: (data) => props.deleteAction(data?._id),
      }}
      sx={{ marginTop: 2, paddingBottom: 2 }}
      selectRowProps={{
        skipFirstSelection: true,
        selectedRow,
        setSelectedRow,
      }}
    />
  )
}
