import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getSchools, getSchoolById } from '../../services/schools'

type Props = {
  enableQueryAll: boolean
  enableQueryOne: boolean
}

export default function useSchoolQueries(props: Props) {
  const { schoolId } = useParams<{ schoolId: string }>()

  const {
    data: schools,
    isLoading: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ['schools'],
    queryFn: getSchools,
    enabled: props.enableQueryAll,
  })

  const { data: school, isLoading: isLoadingOne } = useQuery({
    queryKey: ['school', schoolId],
    queryFn: () => getSchoolById(schoolId),
    enabled: !!schoolId && props.enableQueryOne,
  })

  const isLoading = [isLoadingAll, isLoadingOne].some(Boolean)

  return {
    isLoading,
    schools,
    school,
    refetchAll,
  }
}
