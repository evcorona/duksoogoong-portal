'use client'

import CustomTable from '@/src/components/CustomTable/CustomTable'
import TitleBar from '@/src/components/TitleBar'
import { TUTORS_HEADERS } from '@/schools/[schoolId]/tutors/constants/tutor.headers'
import { deleteTutor, getTutorsBySchoolId } from '@/src/services/tutors'
import Page from '@/src/components/Page'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams, usePathname, useRouter } from 'next/navigation'
import SeeDetailButton from '@/src/components/CustomTable/SeeDetailButton'
import { ITutor } from '@/src/types/Tutor'

export default function Tutors() {
  const { push } = useRouter()
  const pathname = usePathname()
  const { schoolId } = useParams<{ schoolId: string }>()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['schoolTutors', schoolId],
    queryFn: () => getTutorsBySchoolId(schoolId as string),
    enabled: !!schoolId,
  })

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteTutor,
    onSuccess: () => refetch(),
  })

  return (
    <Page>
      <TitleBar title="Tutores" />
      <CustomTable
        name="tutors"
        headers={TUTORS_HEADERS}
        data={data || []}
        isLoading={isLoading}
        menuProps={{
          editAction: (data) => push(`${pathname}/${data?._id}/edit`),
          deleteAction: (data) => deleteMutation(data?._id),
        }}
        rowComponentProps={{
          actions: { href: (row: ITutor) => `${pathname}/${row?._id}` },
          component: SeeDetailButton,
        }}
        sx={{ marginTop: 2, paddingBottom: 2 }}
      />
    </Page>
  )
}
