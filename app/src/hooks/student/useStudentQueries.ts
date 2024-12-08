import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getStudentsBySchoolId, getStudentById } from '../../services/students'
import { IQueryProps } from '@/src/types/app/QueryProps'

export default function useStudentQueries(props: IQueryProps) {
  const { schoolId, studentId } = useParams<{
    schoolId: string
    studentId: string
    teacherId: string
    tutorId: string
  }>()

  const {
    data: studentsBySchool,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ['studentsBySchool', schoolId],
    queryFn: () => getStudentsBySchoolId(schoolId),
    enabled: !!schoolId && !!props.enableQueryAll,
  })

  const { data: student, isLoading: isLoadingOne } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentById(studentId),
    enabled: !!studentId && !!props.enableQueryOne,
  })

  const isLoading = [isLoadingAll, isLoadingOne].some(Boolean)

  return {
    isLoading,
    studentsBySchool,
    student,
    refetchAll,
  }
}
