import { IStudent } from '@/src/types/Student'
import { Stack } from '@mui/material'
import StudentTab from '@/schools/[schoolId]/students/sections/ExamFormat/StudentTab'
import Header from '@/schools/[schoolId]/students/sections/ExamFormat/Header'
import ExamTab from '@/schools/[schoolId]/students/sections/ExamFormat/ExamTab'

type Props = { data: IStudent }

export default function ExamFormat(props: Props) {
  return (
    <Stack
      gap={2}
      direction={'column'}
      sx={{ padding: 4 }}
      width="1120px"
      id="exam-format"
    >
      <Header />
      <StudentTab data={props.data} />
      <ExamTab />
    </Stack>
  )
}
