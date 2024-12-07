import CustomDataColumns from '@/src/components/CustomDataColumns'
import { IStudent } from '@/src/types/Student'
import { currentGradeToString, getNextGrade } from '@/src/utils/formatGrades'
import { formatPracticeTime } from '@/src/utils/formatPracticeTime'
import { Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

type Props = {
  data: IStudent
}

export default function StudentTab(props: Props) {
  const age = dayjs().diff(props.data.birthDate, 'year')
  const birthDate = dayjs(props.data.birthDate).format('DD/MM/YYYY')

  const studentName = `${props.data.name} ${props.data.lastName}`

  const practiceTime = formatPracticeTime(
    props.data.enrollmentDate as Date,
  ).string

  const schoolName = props.data.schoolId?.name ?? ''
  const teacherName = `${props.data.teacherId?.name} ${props.data.teacherId?.lastName}`

  const currentGrade = currentGradeToString(props.data.grade)
  const nextGrade = getNextGrade(props.data.grade, age).string

  const fields = [
    [
      { label: 'Ocupación', value: props.data.occupation },
      { label: 'Estado civil', value: props.data.civilStatus },
      { label: 'Fecha de nacimiento', value: birthDate },
    ],
    [
      { label: 'Edad', value: `${age} años` },
      { label: 'Tiempo practicando', value: practiceTime },
      { label: 'Escuela', value: schoolName },
    ],
    [
      { label: 'Profesor', value: teacherName },
      { label: 'Grado actual', value: currentGrade },
      { label: 'Grado a subir', value: nextGrade },
    ],
  ]

  const footerFields = [
    [{ label: 'Firma del estudiante', value: null }],
    [{ label: 'Firma del tutor (si aplica)', value: null }],
  ]

  return (
    <Stack
      gap={2}
      sx={{
        border: '1px solid lightgray',
        padding: 2,
        borderRadius: '8px',
      }}
    >
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
        Estudiante: {studentName}
      </Typography>
      <CustomDataColumns fields={fields} />
      <Typography
        variant="subtitle1"
        fontSize="12px"
        fontStyle={'italic'}
        sx={{
          textDecoration: 'underline',
          textUnderlineOffset: '2px',
          paddingX: 1,
        }}
      >
        El taekwondo es un deporte de contacto, por lo que estoy consciente de
        los riesgos inherentes a su práctica. Durante la realización del examen,
        reconozco que pueden ocurrir lesiones y, en caso de que esto suceda,
        deslindo de toda responsabilidad a la Asociación Duk Soo Goong y a los
        profesores que la integran, por cualquier accidente que pudiera
        presentarse durante el desarrollo del examen. Al firmar este documento,
        asumo la plena responsabilidad de mi salud y bienestar durante la
        realización del mismo.
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign={'center'}
        fontSize="14px"
      >
        Al firmar esta solicitud, se confirma que los datos proporcionados son
        correctos y autoriza que los mismos sean utilizados en el certificado de
        grado.
      </Typography>
      <CustomDataColumns
        fields={footerFields}
        sx={{ paddingTop: 2 }}
      />
    </Stack>
  )
}
