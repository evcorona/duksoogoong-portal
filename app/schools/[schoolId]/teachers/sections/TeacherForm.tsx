'use client'

import DEFAULT_TEACHER_VALUES from '@/schools/[schoolId]/teachers/constants/teacher.default.values'
import {
  createTeacher,
  editTeacher,
  getTeacherById,
} from '@/src/services/teachers'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import schema from '@/schools/[schoolId]/teachers/constants/teacher.schema'
import RHFTextField from '@/src/components/form/RHFTextField'
import FormContainer from '@/src/components/form/FormContainer'
import { useEffect } from 'react'
import { ITeacher } from '@/src/types/Teacher'
import RHFSwitch from '@/src/components/form/RHFSwitch'
import RHFAutocomplete from '@/src/components/form/RHFAutocomplete'
import { DAN_GRADES } from '@/src/constants/business'
import { PHONE_MASK } from '@/src/constants/inputMasks'

export default function TeacherForm() {
  const { back } = useRouter()

  const { schoolId, teacherId } = useParams<{
    schoolId: string
    teacherId: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: ['school', teacherId],
    queryFn: () => getTeacherById(teacherId as string),
    enabled: !!teacherId,
  })

  const methods = useForm<any>({
    mode: 'onTouched',
    defaultValues: DEFAULT_TEACHER_VALUES,
    resolver: yupResolver(schema),
  })

  const {
    reset,
    watch,
    formState: { isLoading: isLoadingForm, isSubmitting, isValidating },
  } = methods

  const isAdmin = watch('isAdmin')

  const { mutate: createTeacherSubmit } = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => back(),
  })

  const { mutate: editTeacherSubmit } = useMutation({
    mutationFn: editTeacher,
    onSuccess: () => back(),
  })

  useEffect(() => {
    data &&
      reset({ ...data, email: data?.userId?.email, userId: data?.userId?._id })
  }, [data])

  const buttonLabel = data ? 'Actualizar' : 'Crear'

  const submitAction = data
    ? (formData: ITeacher) =>
        editTeacherSubmit({ ...formData, _id: teacherId, schoolId })
    : (formData: ITeacher) => createTeacherSubmit({ ...formData, schoolId })

  const disableForms =
    isLoading || isLoadingForm || isSubmitting || isValidating

  return (
    <FormContainer
      methods={methods}
      submitAction={submitAction}
      buttonLabel={buttonLabel}
      isLoading={isLoading}
      disabled={disableForms}
      extraFooterComponents={
        <RHFSwitch
          name='isAdmin'
          label={isAdmin ? 'Administrador' : 'Profesor'}
          sx={{ color: isAdmin ? 'default' : 'GrayText' }}
        />
      }
    >
      <RHFTextField
        name='name'
        label='Nombre'
        capitalize
        disabled={disableForms}
      />
      <RHFTextField
        name='lastName'
        label='Apellidos'
        capitalize
        disabled={disableForms}
      />
      <RHFTextField
        name='phone'
        label='Teléfono'
        capitalize
        disabled={disableForms}
        maskoptions={{
          mask: PHONE_MASK,
          unmask: true,
        }}
      />
      <RHFAutocomplete
        disableClearable
        name='grade'
        label='Grado actual'
        noOptionsText='Seleccionar nivel actual'
        options={DAN_GRADES.slice(1, DAN_GRADES.length)}
        disabled={disableForms}
      />
      <RHFTextField
        name='email'
        label='Email de acceso'
        disabled={data || disableForms}
      />
    </FormContainer>
  )
}
