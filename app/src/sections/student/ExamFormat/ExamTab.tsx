import { Stack, Typography } from '@mui/material'
import CustomDataColumns from '@/src/components/CustomDataColumns'
import ExamFooter from './ExamFooter'
import ExamTopics from './ExamTopics'

export default function ExamTab() {
  const fields = [
    [
      {
        label: 'Fecha del examen',
        value: null,
      },
    ],
    [{ label: 'Nombre del sinodal', value: null }],
  ]

  return (
    <Stack gap={2}>
      <Typography
        variant="subtitle1"
        fontWeight={'bold'}
        sx={{
          backgroundColor: 'lightgray',
          paddingLeft: 1,
          borderRadius: '8px',
          textTransform: 'uppercase',
        }}
      >
        Examen
      </Typography>
      <CustomDataColumns fields={fields} />
      <ExamTopics />
      <ExamFooter />
    </Stack>
  )
}
