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
import RHFAddressForm from '@/src/components/form/RHFAddressForm'
import TitleBar from '@/src/components/TitleBar'
import { useEffect } from 'react'
import { ITeacher } from '@/src/types/Teacher'

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
    formState: { isLoading: isLoadingForm, isSubmitting, isValidating },
  } = methods

  const { mutate: createTeacherSubmit } = useMutation({
    mutationFn: createTeacher,
    onSuccess: () => back(),
  })

  const { mutate: editTeacherSubmit } = useMutation({
    mutationFn: editTeacher,
    onSuccess: () => back(),
  })

  useEffect(() => {
    data && reset(data)
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
    >
      <RHFTextField name='name' label='Nombre del profesor' capitalize />
    </FormContainer>
  )
}
