import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getSchools, getSchoolById } from '../../services/schools'
import { ISchool } from '@/src/types/School'
import { IQueryProps } from '@/src/types/app/QueryProps'

export default function useSchoolQueries(props: IQueryProps) {
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

  const { data: schoolOptions, isLoading: isLoadingOptions } = useQuery({
    queryKey: ['schoolOptions'],
    queryFn: getSchools,
    enabled: props.enableQueryOptions,
    select: (data: ISchool[]) =>
      data.map(({ _id, name }) => ({
        value: _id ?? '',
        label: name.toUpperCase(),
      })),
  })

  const { data: school, isLoading: isLoadingOne } = useQuery({
    queryKey: ['school', schoolId],
    queryFn: () => getSchoolById(schoolId),
    enabled: !!schoolId && props.enableQueryOne,
  })

  const isLoading = [isLoadingAll, isLoadingOne, isLoadingOptions].some(Boolean)

  return {
    isLoading,
    schools,
    school,
    schoolOptions,
    refetchAll,
  }
}
