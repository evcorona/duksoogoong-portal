import { IStudent } from '@/src/types/Student'
import { Stack } from '@mui/material'
import StudentTab from './StudentTab'
import Header from './Header'
import ExamTab from './ExamTab'

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
