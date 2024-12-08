'use client'

import { CIVIL_STATUSES, TIME_PERIODS, LEVELS } from '@/src/constants/business'
import { Button, Stack, Typography } from '@mui/material'
import CustomGridContainer from '@/src/components/CustomGridContainer'
import FormContainer from '@/src/components/form/FormContainer'
import RHFAutocomplete from '@/src/components/form/RHFAutocomplete'
import RHFTextField from '@/src/components/form/RHFTextField'
import { useEffect } from 'react'
import TitleBar from '@/src/components/TitleBar'
import useStudentQueries from '@/src/hooks/student/useStudentQueries'
import useStudentForm from '@/src/hooks/student/useStudentForm'
import useSchoolQueries from '@/src/hooks/school/useSchoolQueries'
import useTeacherQueries from '@/src/hooks/teacher/useTeacherQueries'
import useCreateStudent from '@/src/hooks/student/useCreateStudent'
import useEditStudent from '@/src/hooks/student/useEditStudent'
import { useRouter } from 'next/navigation'

export default function StudentForm() {
  const { back } = useRouter()

  const { student: studentToEdit, isLoading: isLoadingData } =
    useStudentQueries({ enableQueryOne: true })

  const { methods, gradesOptions, ageLabel, displayNextGrade, nextGradeLabel } =
    useStudentForm({ studentToEdit })

  const {
    watch,
    setValue,
    formState: { isValidating, isSubmitSuccessful },
  } = methods

  const schoolSelected = watch('schoolId')

  const { schoolOptions, isLoading: isLoadingSchools } = useSchoolQueries({
    enableQueryOptions: true,
  })
  const { teacherOptions, isLoading: isLoadingTeachers } = useTeacherQueries({
    enableQueryOptions: true,
    externalSchoolId: schoolSelected,
  })

  const { createStudentSubmit, isCreating } = useCreateStudent()
  const { editStudentSubmit, isEditing } = useEditStudent()

  const submitAction = studentToEdit ? editStudentSubmit : createStudentSubmit
  const buttonLabel = studentToEdit ? 'Guardar cambios' : 'Crear estudiante'

  const disableForms = [
    isValidating,
    isLoadingData,
    isCreating,
    isEditing,
    isSubmitSuccessful,
  ].some(Boolean)

  const isLoading = [isValidating, isCreating, isEditing].some(Boolean)

  useEffect(() => {
    if (teacherOptions && !studentToEdit)
      setValue('teacherId', teacherOptions[0]?.value)
  }, [teacherOptions])

  return (
    <Stack gap={4}>
      <FormContainer
        methods={methods}
        submitAction={submitAction}
        buttonLabel={buttonLabel}
        isLoading={isLoading}
        disabled={disableForms}
        extraFooterComponents={
          <Button
            variant="outlined"
            onClick={back}
          >
            Cancelar
          </Button>
        }
      >
        <TitleBar
          title="Datos personales"
          isSectionTitle
        />
        <RHFTextField
          name="name"
          label="Nombre"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="lastName"
          label="Apellidos"
          type="text"
          disabled={disableForms}
        />

        <RHFAutocomplete
          name="civilStatus"
          label="Estado civil"
          options={CIVIL_STATUSES}
          disabled={disableForms}
          disableClearable
        />
        <RHFTextField
          name="occupation"
          label="Ocupación"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="curp"
          label="CURP"
          type="text"
          disabled={disableForms}
        />
        <CustomGridContainer
          itemSize={[{ xs: 9 }, { xs: 3 }]}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RHFTextField
            name="birthDate"
            label="Fecha de nacimiento"
            type="date"
            disabled={disableForms}
          />
          {ageLabel && (
            <Typography
              fontStyle={'italic'}
              fontSize={'small'}
            >
              {ageLabel}
            </Typography>
          )}
        </CustomGridContainer>
        <TitleBar
          title="Tiempo de practica previa"
          isSectionTitle
        />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RHFTextField
            name="timePracticing"
            label="Tiempo de práctica"
            type="number"
            disabled={disableForms}
          />
          <RHFAutocomplete
            disabled={disableForms}
            disableClearable
            name="periodTime"
            label="Periodo de tiempo"
            options={TIME_PERIODS}
          />
        </CustomGridContainer>
        <TitleBar
          title="Datos Escolares"
          isSectionTitle
        />
        <RHFTextField
          name="ruf"
          label="Registro Único Federado - RUF (Opcional)"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="enrollmentDate"
          label="Fecha de inscripción"
          type="date"
          disabled={disableForms}
        />
        <RHFAutocomplete
          disableClearable
          name="schoolId"
          label="Escuela"
          noOptionsText="Seleccionar escuela"
          options={schoolOptions || []}
          loading={isLoadingSchools}
          disabled={disableForms}
        />
        <RHFAutocomplete
          disableClearable
          name="teacherId"
          label="Profesor"
          noOptionsText="Seleccionar profesor"
          options={teacherOptions || []}
          loading={isLoadingTeachers}
          disabled={disableForms}
        />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
        >
          <RHFAutocomplete
            name="grade.level"
            label="Nivel actual"
            options={LEVELS}
            disableClearable
            disabled={disableForms}
            noOptionsText="Seleccionar nivel actual"
          />
          <RHFAutocomplete
            disableClearable
            name="grade.value"
            label="Grado actual"
            noOptionsText="Seleccionar grado actual"
            options={gradesOptions}
            disabled={disableForms}
          />
          {displayNextGrade && (
            <Typography
              whiteSpace="nowrap"
              fontStyle={'italic'}
              fontSize={'small'}
            >
              Siguiente grado:
            </Typography>
          )}
          {displayNextGrade && (
            <Typography
              textTransform={'capitalize'}
              fontSize={'small'}
            >
              {nextGradeLabel}
            </Typography>
          )}
        </CustomGridContainer>
      </FormContainer>
    </Stack>
  )
}
