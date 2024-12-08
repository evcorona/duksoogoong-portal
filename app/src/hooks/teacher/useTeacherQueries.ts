import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getTeachersBySchoolId, getTeacherById } from '../../services/teachers'

type Props = {
  enableQueryAll: boolean
  enableQueryOne: boolean
}

export default function useTeacherQueries(props: Props) {
  const { schoolId, teacherId } = useParams<{
    schoolId: string
    teacherId: string
  }>()

  const {
    data: teachersBySchool,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ['teachersBySchool', schoolId],
    queryFn: () => getTeachersBySchoolId(schoolId as string),
    enabled: !!schoolId && props.enableQueryAll,
  })

  const { data: teacher, isLoading: isLoadingOne } = useQuery({
    queryKey: ['teacher', teacherId],
    queryFn: () => getTeacherById(teacherId),
    enabled: !!teacherId && props.enableQueryOne,
  })

  const isLoading = [isLoadingAll, isLoadingOne].some(Boolean)

  return {
    isLoading,
    teachersBySchool,
    teacher,
    refetchAll,
  }
}
