import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getTeachersBySchoolId, getTeacherById } from '../../services/teachers'
import { ITeacher } from '@/src/types/Teacher'
import { IQueryProps } from '@/src/types/app/QueryProps'

interface Props extends IQueryProps {
  externalSchoolId?: string
}

export default function useTeacherQueries(props: Props) {
  const { schoolId, teacherId } = useParams<{
    schoolId: string
    teacherId: string
  }>()

  const targetSchoolId = props.externalSchoolId ?? schoolId

  const {
    data: teachersBySchool,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ['teachersBySchool', targetSchoolId],
    queryFn: () => getTeachersBySchoolId(targetSchoolId),
    enabled: !!targetSchoolId && props.enableQueryAll,
  })

  const { data: teacherOptions, isLoading: isLoadingOptions } = useQuery({
    queryKey: ['teacherOptions', targetSchoolId],
    queryFn: () => getTeachersBySchoolId(targetSchoolId),
    enabled: !!targetSchoolId && props.enableQueryOptions,
    select: (data: ITeacher[]) =>
      data.map(({ _id, name, lastName }) => ({
        value: _id ?? '',
        label: `${name.toUpperCase()} ${lastName.toUpperCase()}`,
      })),
  })

  const { data: teacher, isLoading: isLoadingOne } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId && props.enableQueryOne,
  })

  const isLoading = [isLoadingAll, isLoadingOne, isLoadingOptions].some(Boolean)

  return {
    isLoading,
    teachersBySchool,
    teacher,
    teacherOptions,
    refetchAll,
  }
}
